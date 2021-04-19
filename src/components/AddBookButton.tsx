import React from 'react'
import { MdFileUpload } from 'react-icons/md'
interface ClubProps {
  clubName: string
  file: File | null
  clubPic: File | null
  private: boolean
  pageSync: boolean
}

interface Props {
  clubDeets: ClubProps
  setClubDeets: React.Dispatch<React.SetStateAction<ClubProps>>
}

const AddBookButton: React.FC<Props> = ({ clubDeets, setClubDeets }) => {
  return (
    <div className='add-book'>
      <input
        type='file'
        id='book-input'
        form='club-form'
        accept='.pdf, .epub'
        required
        onChange={(e) => {
          if (e.target.files !== null && e.target.files.length !== 0) {
            const size = e.target.files[0].size / 1000 / 1000 // file size in MB
            if (size > 30) {
              alert('File exceeded 30MB')
              e.target.value = ''
              return
            }
            setClubDeets({ ...clubDeets, file: e.target.files[0] })
          } else setClubDeets({ ...clubDeets, file: null })
        }}
      />
      <p className='create-book-details'>
        {(clubDeets.file != null) ? `${clubDeets.file.name}` : null}
      </p>
      <label className='create-book-label' htmlFor='book-input'><MdFileUpload />Add Book</label>
    </div>
  )
}

export default AddBookButton
