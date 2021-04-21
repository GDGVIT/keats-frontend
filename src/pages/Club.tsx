import React, { useState, useEffect } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { ImQrcode } from 'react-icons/im'
import { MdAddAPhoto, MdEdit } from 'react-icons/md'
import { getClub } from './../utils/apiCalls'
import Book from './../assets/book.jpg'
import Loader from './../components/Loader'
import './../styles/Club.css'
import AddBookButton from '../components/AddBookButton'

interface clubProps {
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

interface editClubProps {
  id: string
  clubname: string
  club_pic: any
  file: any
}

interface userProps {
  username: string
  bio: string
  email: string
  phone?: string
  profilePic: string
}

interface Response {
  club: clubProps
  users: userProps[]
}


const Club: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [club, setClub] = useState<Response['club']>({
    id: id,
    clubname: 'Club',
    club_pic: '',
    file_url: '',
    page_no: 0,
    private: false,
    page_sync: false,
    host_id: '',
    host_name: '',
    host_profile_pic: ''
  })
  const [editedClub, setEditedClub] = useState<editClubProps>({
    id: id,
    clubname: 'Club',
    club_pic: Book,
    file: null,
  })
  const [redirect, setRedirect] = useState(false)
  const [editedPfp, setEditedPfp] = useState<any>(null)
  const [users, setUsers] = useState<Response['users']>([])
  const [editing, setEditing] = useState(false)
  const [host, setHost] = useState(false)

  const setUserDeets = (usersRes: any): void => {
    usersRes.forEach((user: any) => {
      const details: userProps = {
        username: user.username,
        bio: user.bio,
        email: user.email,
        phone: user.phone_number,
        profilePic: user.profile_pic
      }
      setUsers([...users, details])
    })
  }

  useEffect(() => {
    const getDeets = async (): Promise<void> => {
      const { exists, club, usersRes }: any = await getClub(id)
      if (!exists) {
        setRedirect(!exists)
        return
      }
      setClub(club)
      setEditedClub({
        id: id,
        clubname: club.clubname,
        club_pic: club.club_pic,
        file: club.file
      })
      setUserDeets(usersRes)
      if (localStorage.getItem('userId') === club.host_id) setHost(true)
    }
    getDeets().then(() => { }, () => { })
  }, [])

  return (
    <>
      {redirect
        ? <Redirect to='/clubs' />
        :
        <section>
          <div className='clubs-header'>
            <h2>{club.clubname}</h2>
            <div className='clubp-icons'>
              <div>
                {
                  !editing
                    ? <MdEdit onClick={() => setEditing(true)} />
                    : <FaTimes onClick={() => setEditing(false)} />
                }
              </div>
              <div>
                <ImQrcode onClick={() => setEditing(true)} />
              </div>
            </div>
          </div>

          <div className='clubp-body'>
            <div className='clubp-first'>
              <div className={`clubp-image club-image ${editing ? 'edit' : ''}`}>
                {/* <img src={editDeets.profilePic} alt='Profile' /> */}
                <img src={editedClub.club_pic} alt='Profile' />
                {editing &&
                  <div className='profile-pic-middle'>
                    <label className='profile-camera' htmlFor='profile-pic-input'><MdAddAPhoto className='camera' /></label>
                    <input
                      type='file'
                      id='profile-pic-input'
                      form='edit-club-form'
                      accept='.png, .jpg'
                      onChange={(e) => {
                        if (e.target.files !== null && e.target.files.length !== 0) {
                          setEditedPfp(e.target.files[0])
                          // To get preview
                          const reader = new FileReader()
                          reader.onload = (e) =>
                            setEditedClub({ ...editedClub, club_pic: e.target?.result })
                          reader.readAsDataURL(e.target.files[0])
                        } else setEditedClub({ ...editedClub, club_pic: club.club_pic })
                      }}
                    />
                  </div>}
              </div>
              <div className='buttons'>
                <button id='start-reading'>Start Reading</button>
                {/* <button className='secondary'>Change Book</button> */}
                <AddBookButton clubDeets={editedClub} setClubDeets={setEditedClub} editing={editing} setEditing={setEditing} />
              </div>
            </div>
            <div className='clubp-second'>
              {users.length <= 0
                ? <Loader />
                : users[0].username
              }
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default Club
