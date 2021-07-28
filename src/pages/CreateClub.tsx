import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { MdAddAPhoto } from 'react-icons/md'
import Book from './../assets/book.jpg'
import { createClub } from './../utils/apiCalls'
import AddBookButton from './../components/AddBookButton'
import Loader from './../components/Loader'
import './../styles/Create.css'

interface ClubProps {
  clubName: string
  // file: File | null
  // clubPic: File | null
  file: any
  clubPic: any
  private: boolean
  pageSync: boolean
}

const CreateClub: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [device, setDevice] = useState('')
  const [clubPfp, setClubPfp] = useState<any>(Book)
  const [clubDeets, setClubDeets] = useState<ClubProps>({
    clubName: '',
    file: null,
    clubPic: null,
    private: false,
    pageSync: false
  })
  const history = useHistory()

  const checkDevice = (): string => {
    if (window.innerWidth < 768) return 'phone'
    else if (window.innerWidth < 1200) return 'tablet'
    else return 'desktop'
  }

  useEffect(() => {
    window.addEventListener('load', () => setDevice(checkDevice()))
    window.addEventListener('resize', () => setDevice(checkDevice()))
    return () => setDevice(device => device)
  })

  useEffect(() => {
    setDevice(checkDevice())
    return () => setDevice(device => device)
  }, [])

  const createNewClub = async (raw: ClubProps): Promise<string> => {
    const club = await createClub(raw)
    return club.id
  }

  const handleSave = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault()
    setLoading(true)
    createNewClub(clubDeets).then((res) => { setRedirect(res) }, () => { history.go(0) })
  }

  const CreateButton = (): JSX.Element => (
    <button type='submit' form='club-form' id='create-club-button'>Create Club!</button>
  )

  return (
    <section id='create-club'>
      <div className='clubs-header'>
        <h2>Create a Club</h2>
        <div>
          <Link to='/clubs' className='clubs-redirect'>My Clubs</Link>
          {device === 'phone' && <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
          <Link to='/join' className='clubs-redirect'>Join</Link>
        </div>
      </div>

      {
        !loading
          ? (

            <div className='create-body'>

              <div className='create-first'>
                <div className='club-image create-image'>
                  <img src={clubPfp} alt='Profile' />
                  <div className='profile-pic-middle create-middle'>
                    <label className='profile-camera' htmlFor='create-pic-input'><MdAddAPhoto className='camera' /></label>
                    <input
                      type='file'
                      id='create-pic-input'
                      form='club-form'
                      accept='.png, .jpg'
                      onChange={(e) => {
                        if (e.target.files !== null && e.target.files.length !== 0) {
                          setClubDeets({ ...clubDeets, clubPic: e.target.files[0] })
                          // To get preview
                          const reader = new FileReader()
                          reader.onload = (e1) => {
                            if (e1.target !== null) { setClubPfp(e1.target.result) }
                          }
                          reader.readAsDataURL(e.target.files[0])
                        } else {
                          setClubDeets({ ...clubDeets, clubPic: null })
                          setClubPfp(Book)
                        }
                      }}
                    />
                  </div>
                </div>

                {
                  device !== 'phone'
                    ? <CreateButton />
                    : <AddBookButton clubDeets={clubDeets} setClubDeets={setClubDeets} />
                }

              </div>

              {/* <div className='profile-vert' /> */}

              <div className='create-last'>
                <form id='club-form' onSubmit={handleSave}>
                  <div className='labels'>
                    <label>
                      <input
                        name='club-name'
                        id='club-name'
                        type='text'
                        maxLength={25}
                        placeholder='Enter Club Name'
                        value={clubDeets.clubName}
                        onChange={(e) => setClubDeets({ ...clubDeets, clubName: e.target.value })}
                        autoComplete='off'
                        required
                      />
                    </label>

                    <label className='switch-container'>
                      <span>Private </span>
                      <label className='switch'>
                        <input
                          type='checkbox'
                          checked={clubDeets.private}
                          onChange={(e) => setClubDeets({ ...clubDeets, private: e.target.checked })}
                        />
                        <span className='slider' />
                      </label>
                    </label>
                  </div>

                  {
                    device === 'phone'
                      ? <CreateButton />
                      : <AddBookButton clubDeets={clubDeets} setClubDeets={setClubDeets} />
                  }
                </form>
              </div>
            </div>
          )
          : (
            <>
              <section className='clubp-loader'><Loader /></section>
              {
                redirect !== '' ? <Redirect to={`/club/${redirect}`} /> : null
              }
            </>
          )
      }
    </section>
  )
}

export default CreateClub
