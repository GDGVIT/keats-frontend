import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from './../Context'
import { getUser, updateUser } from './../utils/apiCalls'
import { FaTimes, FaUser, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa'
import { MdEdit, MdEmail, MdAddAPhoto } from 'react-icons/md'
import User from './../assets/user.jpg'
import './../styles/Profile.css'

interface UserDeetsProps {
  username: string
  bio: string
  email: string
  phone?: string
  // profilePic: string | File
  profilePic: any // string or File but i dont want to create another interface just for this :/
}

const Profile: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [, setStage] = stageState

  const [editing, setEditing] = useState(false)
  const [userPfp, setUserPfp] = useState<File>()
  const [userDeets, setUserDeets] = useState<UserDeetsProps>({
    username: '',
    bio: '',
    email: '',
    phone: '',
    profilePic: User
  })
  const [editDeets, setEditDeets] = useState<UserDeetsProps>(userDeets)

  const setDeetsState = (user: any): void => {
    const details = {
      username: user.username,
      bio: user.bio,
      email: user.email,
      phone: user.phone_number,
      profilePic: user.profile_pic
    }
    setUserDeets(details)
    setEditDeets(details)
  }

  useEffect(() => {
    const getUserDeets = async (): Promise<void> => {
      const user = await getUser()
      setDeetsState(user)
    }
    getUserDeets().then(() => { }, () => { })
    return () => {
      setUserDeets(userDeets => userDeets)
      setEditDeets(editDeets => editDeets)
    }
  }, [])

  const handleLogout = (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    window.location.reload()
  }

  const updateUserDeets = async (raw: UserDeetsProps): Promise<void> => {
    const user = await updateUser(raw)
    setDeetsState(user)
    // to reset Nav simultaneously
    setStage('changedPfp')
    setStage('loggedIn')
  }

  const history = useHistory()

  const handleSave = (e: React.BaseSyntheticEvent): void => {
    try {
      e.preventDefault()
      setEditing(false)
      const pfp = (userPfp != null) ? userPfp : editDeets.profilePic
      const raw = {
        username: editDeets.username,
        email: editDeets.email,
        bio: editDeets.bio,
        profilePic: pfp
      }
      // send patch request
      updateUserDeets(raw).then(() => { }, () => { })
    } catch (e) {
      history.go(0)
    }
  }

  useEffect(() => {
    if (!editing) setEditDeets(userDeets)
    return () => {
      setEditing(editing => editing)
      setEditDeets(editDeets => editDeets)
      setUserDeets(userDeets => userDeets)
    }
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
        <p className='profile-email'>{userDeets.email}</p>
      </div>
      <div className='profile-detail'>
        <FaPhoneAlt />
        <p>{userDeets.phone}</p>
      </div>
    </div>
  )

  const inputFrame: JSX.Element = (
    <form className='profile-content' id='profile-form' onSubmit={handleSave}>
      <div className='profile-edit'><FaTimes onClick={() => setEditing(false)} /></div>
      <div className='profile-input'>
        <FaUser />
        <input
          name='username'
          id='username'
          type='text'
          value={editDeets.username}
          placeholder='Enter your name'
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
          placeholder='Enter your bio'
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
          placeholder='Enter your email'
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
          placeholder='Enter your phone'
          value={editDeets.phone}
          onChange={(e) => setEditDeets({ ...editDeets, phone: e.target.value })}
          disabled
        />
      </div>
      <div className='profile-btn'>
        <button id='profile-save'>Save</button>
      </div>
    </form>
  )

  return (
    <section>
      <h2>Profile</h2>

      <div className='profile-body'>
        <div className={`profile-pic ${editing ? 'edit' : ''}`}>
          <img src={editDeets.profilePic} alt='Profile' />
          {editing &&
            <div className='profile-pic-middle'>
              <label className='profile-camera' htmlFor='profile-pic-input'><MdAddAPhoto className='camera' /></label>
              <input
                type='file'
                id='profile-pic-input'
                form='profile-form'
                accept='.png, .jpg'
                onChange={(e) => {
                  if (e.target.files !== null && e.target.files.length !== 0) {
                    setUserPfp(e.target.files[0])
                    // To get preview
                    const reader = new FileReader()
                    reader.onload = (e) =>
                      setEditDeets({ ...editDeets, profilePic: e.target?.result })
                    reader.readAsDataURL(e.target.files[0])
                  } else setEditDeets({ ...editDeets, profilePic: userDeets.profilePic })
                }}
              />
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
