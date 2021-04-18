import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdAddAPhoto, MdFileUpload } from 'react-icons/md'
import Book from './../assets/book.jpg'
import './../styles/Create.css'

// TODO: FIX FORM INPUT FOR ADDING BOOK FILE AND MAKE REQUEST TO BACKEND

interface ClubProps {
  clubName: string
  file: File | null
  clubPic: File | null
  private: boolean
  pageSync: boolean
}

const CreateClub: React.FC = () => {

  const [device, setDevice] = useState<string>('')
  const [clubPfp, setClubPfp] = useState<any>(Book)
  const [clubDeets, setClubDeets] = useState<ClubProps>({
    clubName: '',
    file: null,
    clubPic: null,
    private: false,
    pageSync: false,
  })

  useEffect(() => {
    const checkDevice = (): string => {
      if (window.innerWidth < 768) return 'phone'
      else if (window.innerWidth < 1200) return 'tablet'
      else return 'desktop'
    }
    window.addEventListener('load', () => setDevice(checkDevice()));
    window.addEventListener('resize', () => setDevice(checkDevice()));
  });

  const AddBook = (): JSX.Element => (
    <div className='add-book'>
      <input
        type='file'
        id='book-input'
        form='club-form'
        accept='.pdf, .epub, .jpg, .png'
        required
        onChange={(e) => {
          if (e.target.files !== null && e.target.files.length !== 0) {
            // const size = e.target.files[0].size / 1000 / 1000 // file size in MB
            // if (size > 30) {
            //   alert('File exceeded 30MB')
            //   e.target.value = ''
            //   return
            // }
            console.log(e.target.files[0])
            console.log('b4', clubDeets)
            setClubDeets({ ...clubDeets, file: e.target.files[0] })
            console.log('a4', clubDeets)
          }
          else if (e.target.files === null || e.target.files.length === 0)
            {
              console.log('empty input')
              setClubDeets({ ...clubDeets, file: null })
            }
        }}
      />
      <p className='create-book-details'>
        {clubDeets.file ? `${clubDeets.file.name}` : null}
      </p>
      <label className='create-book-label' htmlFor='book-input'><MdFileUpload />Add a Book</label>
    </div>
  )

  const CreateButton = (): JSX.Element => (
    <button type='submit' form='club-form' id='create-club-button'>Create Club!</button>
  )

  return (
    <section id='create-club'>
      <div className='clubs-header'>
        <h2>Create a Club</h2>
        <div>
          <Link to='/clubs' className='clubs-redirect'>My Clubs</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to='/join' className='clubs-redirect'>Join</Link>
        </div>
      </div>

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
                onChange={(e) => {
                  if (e.target.files !== null && e.target.files.length !== 0) {
                    setClubDeets({ ...clubDeets, clubPic: e.target.files[0] })
                    // To get preview
                    const reader = new FileReader()
                    reader.onload = (e1) => {
                      if (e1.target !== null)
                        setClubPfp(e1.target.result)
                    }
                    reader.readAsDataURL(e.target.files[0])
                  }
                  else if (e.target.files === null || e.target.files.length === 0) {
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
              : <AddBook />
          }

        </div>

        {/* <div className='profile-vert' /> */}

        <div className='create-last'>
          <form id='club-form' onSubmit={() => console.log('submitted')}>
            <div className='labels'>
              <label>
                <input
                  name='club-name'
                  id='club-name'
                  type='text'
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
                  <input type='checkbox' />
                  <span className='slider round'></span>
                </label>
              </label>
            </div>

            {
              device === 'phone'
                ? <CreateButton />
                : <AddBook />
            }
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateClub
