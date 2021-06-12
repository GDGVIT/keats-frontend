import React, { useState, useEffect } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { IoIosBook } from 'react-icons/io'
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
    let pfp: undefined | string = undefined
    users.forEach(user => {
      if (user.id === id) pfp = user.profilePic
    })
    return pfp
  }

  const getUserName = (id: string): string | undefined => {
    let username: undefined | string = undefined
    users.forEach(user => {
      if (user.id === id) username = user.username
    })
    return username
  }

  const getMessageContinuity = (idx: number, sender: string): boolean => (
    (idx !== chat.length - 1 && sender === chat[idx + 1].user_id) ? true : false
  )

  // Socket tings
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  const [webSocket, setWebSocket] = useState<any>(null)

  const sendChat = (): void => {
    if (userMsg === '') {
      alert('fkof')
      return
    }

    const msg = {
      action: 'chatmessage',
      data: userMsg
    }
    webSocket.send(JSON.stringify(msg))
    console.log('msgsent')
  }

  const connect = () => {

    if (webSocket !== null) {
      webSocket.onmessage = (e: { data: string }): void => {
        let data = JSON.parse(e.data).data
        // console.log(data)
        setChat([...chat, data])
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

  // console.log('chat', chat)
  // console.log('users', users)

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
              <section>
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
                  {chat && chat.map((msg, idx) =>
                    <Message
                      key={msg.id}
                      msg={msg}
                      userPfp={getUserPfp(msg.user_id)}
                      userName={getUserName(msg.user_id)}
                      continuity={getMessageContinuity(idx, msg.user_id)}
                      final={idx > 0 && getMessageContinuity(idx-1, chat[idx-1].user_id) && !getMessageContinuity(idx, msg.user_id)}/>)
                      // final would be if the one before it had continuity but this one doesnt
                  }
                </div>
                <input type='text' value={userMsg} onChange={e => setUserMsg(e.target.value)} />
                <button onClick={sendChat}>Click to chat</button>
              </section>
            </>
        /* eslint-enable  @typescript-eslint/indent */
        /* eslint-enable  react/jsx-indent */
      }
    </>
  )
}

export default Chat
