import React, { useEffect, useState } from 'react'
import { getUser, updateUser } from './../utils/apiCalls'
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
  // const [loading, setLoading] = useState(true)
  const [userPfp, setUserPfp] = useState(User)
  const [userDeets, setUserDeets] = useState<UserDeetsProps>({
    username: '',
    bio: '',
    email: '',
    phone: ''
  })
  const [editDeets, setEditDeets] = useState<UserDeetsProps>(userDeets)

  const setDeetsState = (user: any) => {
    const details = {
      username: user.username,
      bio: user.bio,
      email: user.email,
      phone: user.phone_number
    }
    setUserDeets(details)
    setEditDeets(details)
  }

  const getUserDeets = async (): Promise<void> => {
    const user = await getUser()
    setUserPfp(user.profile_pic)
    setDeetsState(user)
    // setLoading(false)
  }

  useEffect(() => {
    getUserDeets().then(() => { }, () => { })
  }, [])


  const handleLogout = (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    window.location.reload()
  }

  const updateUserDeets = async (raw: string): Promise<void> => {
    const user = await updateUser(raw)
    setDeetsState(user)
    // setLoading(false)
  }

  const handleSave = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault()
    setEditing(false)
    const raw = JSON.stringify({
      username: editDeets.username,
      email: editDeets.email,
      bio: editDeets.bio
    })
    // send patch request
    updateUserDeets(raw).then(() => { }, () => { })
  }

  useEffect(() => {
    if (editing === false) setEditDeets(userDeets)
  }, [editing, userDeets])


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

  const inputFrame: JSX.Element = (
    <form className='profile-content' onSubmit={handleSave}>
      <div className='profile-edit'><FaTimes onClick={() => setEditing(false)} /></div>
      {/* form validaion kar lo */}
      <div className='profile-input'>
        <FaUser />
        <input
          name='username'
          id='username'
          type='text'
          value={editDeets.username}
          autoComplete='off'
          onChange={(e) => setEditDeets({ ...editDeets, username: e.target.value })}
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
          maxLength={100}
          value={editDeets.bio}
          onChange={(e) => setEditDeets({ ...editDeets, bio: e.target.value })}
        />
      </div>
      <div className='profile-input'>
        <MdEmail />
        <input
          name='email'
          id='email'
          type='email'
          value={editDeets.email}
          onChange={(e) => setEditDeets({ ...editDeets, email: e.target.value })}
        />
      </div>
      <div className='profile-input'>
        <FaPhoneAlt />
        <input
          name='phone'
          id='phone'
          type='tel'
          value={editDeets.phone}
          onChange={(e) => setEditDeets({ ...editDeets, phone: e.target.value })}
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
