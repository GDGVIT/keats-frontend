import React, { useState, useEffect } from 'react'
import { useParams, Link, Redirect, useHistory } from 'react-router-dom'
import { FaTimes, FaSave } from 'react-icons/fa'
import { ImQrcode } from 'react-icons/im'
import { MdAddAPhoto, MdEdit } from 'react-icons/md'
import { getClub, togglePrivate, updateClub, leaveClub } from './../utils/apiCalls'
import Book from './../assets/book.jpg'
import Loader from './../components/Loader'
import AddBookButton from './../components/AddBookButton'
import Members from './../components/Members'
import Modal from './../components/Modal'
import Illustration from './../assets/illustration1.svg'
import './../styles/Club.css'

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

interface EditClubProps {
  id: string
  clubname: string
  club_pic: any
  file: any
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
  const [editedClub, setEditedClub] = useState<EditClubProps>({
    id: id,
    clubname: '',
    club_pic: Book,
    file: null
  })
  const [redirect, setRedirect] = useState(false)
  const [editedPfp, setEditedPfp] = useState<any>(null)
  const [users, setUsers] = useState<Response['users']>([])
  const [editing, setEditing] = useState(false)
  const [host, setHost] = useState(false)
  const [usersRefresh, setUsersRefresh] = useState(false)
  const [showQr, setShowQr] = useState(false)

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
  }, [id, usersRefresh])

  useEffect(() => {
    setEditedClub({
      id: id,
      clubname: club.clubname,
      club_pic: club.club_pic,
      file: null
    })
  }, [club, id])

  const handleDisregard = (): void => {
    setEditedClub({
      id: id,
      clubname: club.clubname,
      club_pic: club.club_pic,
      file: null
    })
    setEditing(false)
  }

  const updateClubDeets = async (raw: EditClubProps): Promise<any> => {
    const responseClub = await updateClub(raw)
    setClub(responseClub)
    // setEditedClub({
    //   id: id,
    //   clubname: club.clubname,
    //   club_pic: club.club_pic,
    //   file: null
    // })
  }

  const history = useHistory()

  const handleSave = async (): Promise<void> => {
    setEditing(false)
    const pfp = (editedPfp != null) ? editedPfp : editedClub.club_pic
    try {
      const raw = {
        id: editedClub.id,
        clubname: editedClub.clubname,
        club_pic: pfp,
        file: editedClub.file
      }
      await updateClubDeets(raw)
    } catch (e) {
      history.go(0)
    }
  }

  const handleToggle = async (e: React.BaseSyntheticEvent): Promise<any> => {
    e.preventDefault()
    setClub({ ...club, private: !club.private })
    try {
      await togglePrivate(id)
    } catch (e) {
      console.log(e)
    }
  }

  const handleLeave = (): void => {
    setRedirect(true)
    try {
      leaveClub(id).then(() => { }, () => { })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {redirect
        ? <Redirect to='/clubs' />
        : users.length <= 0
          ? <section className='clubp-loader'><Loader /></section>
          : (
            <>
              <section>
                <div className='clubs-header'>
                  <h2>{club.clubname}</h2>
                  <div className='clubp-icons'>
                    <div>
                      {
                        host && (
                          !editing
                            ? <MdEdit onClick={() => setEditing(true)} />
                            /* eslint-disable  @typescript-eslint/indent */
                            : <>
                                <FaTimes onClick={handleDisregard} />
                                <FaSave onClick={handleSave} />
                              </>
                            /* eslint-enable  @typescript-eslint/indent */
                        )
                      }
                    </div>
                    <div>
                      <ImQrcode onClick={() => setShowQr(true)} />
                    </div>
                  </div>
                </div>

                <div className='clubp-body'>
                  <div className='clubp-first'>
                    <div className='clubp-first-first'>
                      <div className={`clubp-image club-image ${editing ? 'edit' : ''}`}>
                        <img src={editedClub.club_pic} alt='Profile' />
                        {editing &&
                          <div className='profile-pic-middle'>
                            <label className='profile-camera' htmlFor='profile-pic-input'>
                              <MdAddAPhoto className='camera' />
                            </label>
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
                      <div className='clubp-private'>
                        <label className='switch-container clubp-switch'>
                          <span>{editing ? 'Private' : club.private ? 'Private' : 'Public'}</span>
                          {editing &&
                            <label className='switch'>
                              <input
                                key={Math.random()}
                                type='checkbox'
                                checked={club.private}
                                onChange={handleToggle}
                              />
                              <span className='slider' />
                            </label>}
                        </label>
                      </div>
                    </div>
                    <div className='buttons'>
                      {editing
                        ? host && <AddBookButton clubDeets={editedClub} setClubDeets={setEditedClub} editing={editing} setEditing={setEditing} />
                        : <Link to={`/club/${id}/read`}><button id='start-reading'>Start Reading</button></Link>}
                    </div>
                  </div>

                  <div className='clubp-second'>
                    <div className='clubp-members'>
                      <Members clubId={id} users={users} host={club.host_id} refresh={usersRefresh} setRefresh={setUsersRefresh} />
                    </div>
                    <div className='leave-club'>
                      <button id='leave' onClick={handleLeave}>Leave Club</button>
                    </div>
                  </div>
                </div>
                <div className='clubp-illustration'>
                  <img src={Illustration} alt='Keats' />
                </div>
              </section>
              {showQr && <Modal onClose={() => setShowQr(false)} id={id} />}
            </>
          )}
    </>
  )
}

export default Club
