import React from 'react'
import { FaHeart } from 'react-icons/fa'
import './../styles/Message.css'

interface MessageProps {
  club_id: string
  id: string
  likes: number
  message: string
  user_id: string
}

interface Props {
  msg: MessageProps
  userPfp: string|undefined
  userName: string|undefined
  top: boolean
  continuity: boolean
  final: boolean
}

const Message: React.FC<Props> = ({ msg, userPfp, userName, top, continuity, final }) => {

  const userId = localStorage.getItem('userId')

  return (
    <div className={`message ${userId === msg.user_id ? 'self' : 'other'} ${continuity ? 'continue' : ''} ${final ? 'final' : ''} ${continuity && !top ? 'top' : ''}` }>
      <div className='msg-img'>{!continuity && <img src={userPfp} alt={userName}/>}</div>

      <div className='msg-wrapper' title='Double tap to like!'>
        <div className={`msg-content ${!(msg.likes > 0 || !continuity) ? 'continue' : ''}`}>{msg.message}</div>
        {msg.likes > 0 || !continuity ?
          <div className='msg-lower'>
            {/* {msg.likes > 0 && */}
              <div className='msg-likes'>
                <FaHeart />
                <p className='msg-likes-num'>{msg.likes}</p>
              </div>
            {/* } */}
            {!continuity && <p className='msg-name'>{userName}</p>}
          </div>
          : null
        }
      </div>
    </div>
  )
}

export default Message
