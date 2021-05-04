import React, { useState, useEffect } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { ImQrcode } from 'react-icons/im'
import { MdAddAPhoto, MdEdit } from 'react-icons/md'
import { getClub } from './../utils/apiCalls'
import Book from './../assets/book.jpg'
import Loader from './../components/Loader'
import AddBookButton from './../components/AddBookButton'
import Members from './../components/Members'
import './../styles/Club.css'

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
  id: string
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
  const [editedClub, setEditedClub] = useState<editClubProps>({
    id: id,
    clubname: '',
    club_pic: Book,
    file: null,
  })
  const [redirect, setRedirect] = useState(false)
  const [editedPfp, setEditedPfp] = useState<any>(null)
  const [users, setUsers] = useState<Response['users']>([])
  const [editing, setEditing] = useState(false)
  const [host, setHost] = useState(false)

  const setUserDeets = (usersRes: any): void => {
    const usersTemp: Response['users'] = []
    usersRes.forEach((user: any) => {
      const details: userProps = {
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
  }, [id])

  return (
    <>
      {redirect
        ? <Redirect to='/clubs' />
        : users.length <= 0
          ? <div className='clubp-loader'>
              <Loader />
            </div>
          : (
            <section>
              <div className='clubs-header'>
                <h2>{club.clubname}</h2>
                <div className='clubp-icons'>
                  <div>
                    {
                      host && (
                        !editing
                          ? <MdEdit onClick={() => setEditing(true)} />
                          : <FaTimes onClick={() => setEditing(false)} />
                      )
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
                    <Link to={`/club/${id}/read`}><button id='start-reading'>Start Reading</button></Link>
                    {host && editing &&
                      <AddBookButton clubDeets={editedClub} setClubDeets={setEditedClub} editing={editing} setEditing={setEditing} />
                    }
                  </div>
                </div>

                <div className='clubp-second'>
                  <div className='clubp-private'>
                    <label className='switch-container clubp-switch'>
                      <span>{club.private ? 'Private' : 'Public'}</span>
                      {editing &&
                        <label className='switch'>
                          <input
                            type='checkbox'
                            // checked={editedClub.private}
                            // some different request
                            // onChange={(e) => setClubDeets({ ...clubDeets, private: e.target.checked })}
                          />
                          <span className='slider' />
                        </label>
                      }
                    </label>
                  </div>
                  <div className='clubp-members'>
                    <Members users={users} host={club.host_id}/>
                  </div>
                  <div className='leave-club'>
                    <button id='leave'>Leave Club</button>
                  </div>
                </div>
              </div>
            </section>
          )
      }
    </>
  )
}

export default Club
