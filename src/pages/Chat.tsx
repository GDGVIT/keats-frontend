import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { IoIosBook, IoMdSend } from 'react-icons/io'
import { getClub } from './../utils/apiCalls'
import Loader from './../components/Loader'
import Message from '../components/Message'
import './../styles/Chat.css'

interface ClubProps {
  id: string
  clubname: string
  club_pic: string
  file_url: string
  page_no: number
  private: boolean
  page_sync: boolean
  host_id: string
  host_name: string
  host_profile_pic: string
}

interface UserProps {
  id: string
  username: string
  bio: string
  email: string
  phone?: string
  profilePic: string
}

interface ChatProps {
  club_id: string
  id: string
  likes: number
  message: string
  user_id: string
}

interface Response {
  club: ClubProps
  users: UserProps[]
  chat: ChatProps[]
}

const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [club, setClub] = useState<Response['club']>({
    id: id,
    clubname: '',
    club_pic: '',
    file_url: '',
    page_no: 0,
    private: false,
    page_sync: false,
    host_id: '',
    host_name: '',
    host_profile_pic: ''
  })
  const [users, setUsers] = useState<Response['users']>([])
  const [redirect, setRedirect] = useState(false)
  const [chat, setChat] = useState<Response['chat']>([])
  const [userMsg, setUserMsg] = useState('')
  const [connected, setConnected] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const setUserDeets = (usersRes: any): void => {
    const usersTemp: Response['users'] = []
    usersRes.forEach((user: any) => {
      const details: UserProps = {
        id: user.id,
        username: user.username,
        bio: user.bio,
        email: user.email,
        phone: user.phone_number,
        profilePic: user.profile_pic
      }
      usersTemp.push(details)
    })
    setUsers(usersTemp)
  }

  useEffect(() => {
    const getDeets = async (): Promise<void> => {
      const { exists, club, usersRes, chat }: { exists: boolean, club: ClubProps, usersRes: UserProps, chat: Response['chat'] } = await getClub(id)
      if (!exists) {
        setRedirect(!exists)
        return
      }
      setClub(club)
      setChat(chat)
      setUserDeets(usersRes)
    }
    getDeets().then(() => { }, () => { })
  }, [id])

  const getUserPfp = (id: string): string | undefined => {
    let pfp: undefined | string
    users.forEach(user => {
      if (user.id === id) pfp = user.profilePic
    })
    return pfp
  }

  const getUserName = (id: string): string | undefined => {
    let username: undefined | string
    users.forEach(user => {
      if (user.id === id) username = user.username
    })
    return username
  }

  const getPrevMessageContinuity = (idx: number, sender: string): boolean => (
    !!((idx !== 0 && sender === chat[idx - 1].user_id))
  )

  const getMessageContinuity = (idx: number, sender: string): boolean => (
    !!((idx !== chat.length - 1 && sender === chat[idx + 1].user_id))
  )

  const scrollToBottom = (): void => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [connected])

  // Socket tings
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  const [webSocket, setWebSocket] = useState<WebSocket|null>(null)

  const sendChat = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault()
    if (userMsg === '') return

    const msg = {
      action: 'chatmessage',
      data: userMsg
    }
    webSocket?.send(JSON.stringify(msg))
    setUserMsg('')
    scrollToBottom()
  }

  const likeChat = (id: string): void => {
    const msg = {
      action: 'like_chatmessage',
      data: id
    }
    webSocket?.send(JSON.stringify(msg))
  }

  const connect = (): void => {
    if (webSocket !== null) {
      webSocket.onmessage = (e: {data: string}): void => {
        const action = JSON.parse(e.data).action
        if (action === 'chatmessage') {
          const data = JSON.parse(e.data).data
          setChat([...chat, data])
          scrollToBottom()
        }

        if (action === 'like_chatmessage') {
          const data = JSON.parse(e.data)
          const msgIdx = chat.findIndex(msg => msg.id === data.chatmessage_id)
          const newChat = [...chat]
          newChat[msgIdx] = { ...newChat[msgIdx], likes: newChat[msgIdx].likes + 1 }
          setChat(newChat)
        }
      }

      webSocket.onopen = (): void => {
        setConnected(true)
      }
    }
  }

  useEffect(() => {
    setWebSocket(new WebSocket(`wss://keats-testing.herokuapp.com/api/ws/${id}?token=${token}`))
  }, [id, token])

  useEffect(() => {
    connect()
  })

  // TODO: Add double click to like
  // TODO: spam like backend watre

  return (
    <>
      {
        redirect
          ? <Redirect to='/clubs' />
          : users.length <= 0 || !connected
            ? <section className='clubp-loader'><Loader /></section>
            /* eslint-disable  @typescript-eslint/indent */
            /* eslint-disable  react/jsx-indent */
            : <>
              <section id='chat'>
                <div className='clubs-header'>
                  <h2><Link to={`/club/${id}`}>{club.clubname}</Link></h2>
                  <div className='clubp-icons'>
                    <div>
                      <Link to={`/club/${id}/read`}>
                        <IoIosBook />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className='chat'>
                  {chat?.map((msg, idx) =>
                    <Message
                      key={msg.id}
                      msg={msg}
                      likeChat={likeChat}
                      userPfp={getUserPfp(msg.user_id)}
                      userName={getUserName(msg.user_id)}
                      top={getPrevMessageContinuity(idx, msg.user_id)}
                      continuity={getMessageContinuity(idx, msg.user_id)}
                      final={idx > 0 && getMessageContinuity(idx - 1, chat[idx - 1].user_id) && !getMessageContinuity(idx, msg.user_id)}
                    />)}
                  <div className='scroll-empty' ref={scrollRef} />
                </div>

                <div className='chat-input'>
                  <form id='chat-form' onSubmit={sendChat}>
                    <input
                      type='text'
                      id='message-input'
                      value={userMsg}
                      placeholder='Send text, or double tap to like!'
                      autoFocus
                      autoComplete='off'
                      maxLength={200}
                      onChange={e => setUserMsg(e.target.value)}
                    />
                    <div className='chat-submit' onClick={sendChat}><IoMdSend /></div>
                  </form>
                </div>
              </section>
              </>
        /* eslint-enable  @typescript-eslint/indent */
        /* eslint-enable  react/jsx-indent */
      }
    </>
  )
}

export default Chat
