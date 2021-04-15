import React, { useEffect, useState } from 'react'
import { getUser } from './../utils/apiCalls'
import { FaTimes, FaUser, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa'
import { MdEdit, MdEmail, MdAddAPhoto } from 'react-icons/md'
// import Loader from './../components/Loader'
import User from './../assets/user.jpg'
import './../styles/Profile.css'

interface UserDeetsProps {
  username: string
  bio: string
  email: string
  phone: string
}

const Profile: React.FC = () => {
  const [editing, setEditing] = useState(false)
  const [userPfp, setUserPfp] = useState(User)
  const [userDeets, setUserDeets] = useState<UserDeetsProps>({
    username: '',
    bio: '',
    email: '',
    phone: ''
  })

  const getUserDeets = async (): Promise<void> => {
    const user = await getUser()
    setUserPfp(user.profile_pic)
    setUserDeets({
      username: user.username,
      bio: user.bio,
      email: user.email,
      phone: user.phone_number
    })
  }

  useEffect(() => {
    getUserDeets().then(() => { }, () => { })
  }, [])

  const landingFrame: JSX.Element = (
    <div className='profile-content'>
      <div className='profile-edit'><MdEdit onClick={() => setEditing(true)} /></div>
      <div className='profile-detail'>
        <FaUser />
        <p>{userDeets.username}</p>
      </div>
      <div className='profile-detail'>
        <FaInfoCircle />
        <p>{userDeets.bio}</p>
      </div>
      <div className='profile-detail'>
        <MdEmail />
        <p>{userDeets.email}</p>
      </div>
      <div className='profile-detail'>
        <FaPhoneAlt />
        <p>{userDeets.phone}</p>
      </div>
    </div>
  )

  const handleLogout = (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    window.location.reload()
  }

  const handleSave = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault()
    setEditing(false)
  }

  const inputFrame: JSX.Element = (
    <form className='profile-content' onSubmit={handleSave}>
      <div className='profile-edit'><FaTimes onClick={() => setEditing(false)} /></div>
      {/* ONCHANGE NEEDS TO RESET ON CANCEL */}
      <div className='profile-input'>
        <FaUser />
        <input
          name='username'
          id='username'
          type='text'
          value={userDeets.username}
          autoComplete='off'
          onChange={(e) => setUserDeets({ ...userDeets, username: e.target.value })}
          required
        />
      </div>
      <div className='profile-input'>
        <FaInfoCircle />
        <input
          name='bio'
          id='bio'
          type='text'
          autoComplete='off'
          value={userDeets.bio}
          onChange={(e) => setUserDeets({ ...userDeets, bio: e.target.value })}
        />
      </div>
      <div className='profile-input'>
        <MdEmail />
        <input
          name='email'
          id='email'
          type='email'
          value={userDeets.email}
          onChange={(e) => setUserDeets({ ...userDeets, email: e.target.value })}
        />
      </div>
      <div className='profile-input'>
        <FaPhoneAlt />
        <input
          name='phone'
          id='phone'
          type='tel'
          value={userDeets.phone}
          onChange={(e) => setUserDeets({ ...userDeets, phone: e.target.value })}
          disabled
        />
      </div>
      <div className='profile-btn'>
        <button id='profile-save'>Save</button>
        {/* <button id='profile-cancel' className='secondary'>Cancel</button> */}
      </div>
    </form>
  )

  return (
    <section>
      <h2>Profile</h2>

      <div className='profile-body'>
        <div className={`profile-pic ${editing ? 'edit' : ''}`}>
          <img src={userPfp} alt='Profile' />
          {editing &&
            <div className='profile-pic-middle'>
              <div className='camera'><MdAddAPhoto /></div>
            </div>}
        </div>
        <div className='profile-vert' />
        <div className='profile-container'>
          {editing ? inputFrame : landingFrame}
        </div>
      </div>
      <button id='logout' onClick={handleLogout}>Logout</button>
    </section>
  )
}

export default Profile
