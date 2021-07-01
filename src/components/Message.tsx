import React from 'react'
import { FaHeart } from 'react-icons/fa'
import User from './../assets/user.jpg'
import './../styles/Message.css'

interface MessageProps {
  club_id: string
  id: string
  likes: number
  message: string
  user_id: string
}

interface Props {
  userId: string|null
  msg: MessageProps
  userPfp: string|undefined
  userName: string|undefined
  top: boolean
  continuity: boolean
  final: boolean
  likeChat: any
}

const Message: React.FC<Props> = ({ userId, msg, userPfp, userName, top, continuity, final, likeChat }) => {
  if (userPfp === undefined) userPfp = User

  const handleLike = (): void => {
    if (userId === msg.user_id) return
    likeChat(msg.id)
  }

  return (
    <div className={`message ${userId === msg.user_id ? 'self' : 'other'} ${continuity ? 'continue' : ''} ${final ? 'final' : ''} ${continuity && !top ? 'top' : ''}`}>
      <div className='msg-img'>{!continuity && <img src={userPfp} alt={userName} />}</div>

      <div className='msg-wrapper' title='Double tap to like!' onDoubleClick={handleLike}>
        <div className={`msg-content ${!(msg.likes > 0 || !continuity) ? 'continue' : ''} ${userName === undefined ? 'yeet' : ''}`}>{msg.message}</div>
        {msg.likes > 0 || !continuity
          /* eslint-disable  @typescript-eslint/indent */
          ? <div className='msg-lower'>
              {/* {msg.likes > 0 && */}
              <div className='msg-likes'>
                <FaHeart onClick={handleLike} />
                <p className='msg-likes-num'>{msg.likes}</p>
              </div>
              {/* } */}
              {!continuity && <p className='msg-name'>{`${userName === undefined ? 'User yeeted' : userName}`}</p>}
            </div>
          : null}
        {
          /* eslint-enable  @typescript-eslint/indent */
        }
      </div>
    </div>
  )
}

export default Message
