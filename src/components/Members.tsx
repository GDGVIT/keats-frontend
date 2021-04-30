import React from 'react'

interface userProps {
  id: string
  username: string
  bio: string
  email: string
  phone?: string
  profilePic: string
}

interface Props {
  users: userProps[]
  host: string
}

const Members: React.FC<Props> = ({ users, host }) => {
  return (
    <div className='members'>
      <h3>Members</h3>
      <div className='members-list'>
        {
          users.map((user) => (
            <div key={user.id} className='member'>
              <div className='member-pfp'>
                <img src={user.profilePic} alt={user.username}/>
              </div>
              <div className='member-name'>
                {user.username}
              </div>
              {host === user.id &&
                <div className='host'>HOST</div>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Members
