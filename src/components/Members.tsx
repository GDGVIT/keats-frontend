import React from 'react'
import { kickUser } from './../utils/apiCalls'
import { FaTimesCircle } from 'react-icons/fa'
import './../styles/Members.css'

interface userProps {
  id: string
  username: string
  bio: string
  email: string
  phone?: string
  profilePic: string
}

interface Props {
  clubId: string
  users: userProps[]
  host: string
  refresh: boolean
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const Members: React.FC<Props> = ({ clubId, users, host, refresh, setRefresh }) => {
  const handleKick = async (userId: string): Promise<void> => {
    try {
      await kickUser(clubId, userId)
    } finally {
      setRefresh(!refresh)
    }
  }

  return (
    <div className='members'>
      <h3>Members</h3>
      <div className='members-list'>
        {
          users.map((user) => (
            <div key={user.id} className={`member ${host === user.id ? 'member-host' : ''}`}>
              <div className='member-pfp'>
                <img src={user.profilePic} alt={user.username} />
              </div>
              <div className='member-name'>
                {user.username}
              </div>
              {host === user.id
                ? <div className='host'>Host</div>
                : host === localStorage.getItem('userId') &&
                  <div className='kick' onClick={async () => await handleKick(user.id)}><FaTimesCircle /></div>}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Members
