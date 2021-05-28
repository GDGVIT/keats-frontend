import React, { useState, useEffect } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { IoIosBook } from 'react-icons/io'
import { getClub } from './../utils/apiCalls'
import Loader from './../components/Loader'
// import './../styles/Chat.css'

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

interface Response {
  club: ClubProps
  users: UserProps[]
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
      const { exists, club, usersRes }: {exists: boolean, club: any, usersRes: UserProps} = await getClub(id)
      if (!exists) {
        setRedirect(!exists)
        return
      }
      setClub(club)
      setUserDeets(usersRes)
    }
    getDeets().then(() => { }, () => { })
  }, [id])


  return (
    <>
      {
        redirect
          ? <Redirect to='/clubs' />
          : users.length <= 0
            ? <section className='clubp-loader'><Loader /></section>
            /* eslint-disable  @typescript-eslint/indent */
            /* eslint-disable  react/jsx-indent */
            : <>
                <section>
                  <div className='clubs-header'>
                    <h2><Link to={`/club/${id}`}>{club.clubname}</Link></h2>
                    <div className='clubp-icons'>
                      <div>
                        <Link to={`/club/${id}/chat`}>
                          <IoIosBook />
                        </Link>
                      </div>
                    </div>
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
