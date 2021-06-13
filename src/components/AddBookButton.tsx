import React from 'react'
import { MdFileUpload } from 'react-icons/md'
// interface CreateClubProps {
//   clubName: string
//   file: File | null
//   clubPic: File | null
//   private: boolean
//   pageSync: boolean
// }

// interface EditClubProps {
//   id: string
//   clubname: string
//   club_pic: any
//   file: any
// }

interface Props {
  // clubDeets: CreateClubProps | EditClubProps
  // setClubDeets: React.Dispatch<React.SetStateAction<CreateClubProps>> | React.Dispatch<React.SetStateAction<EditClubProps>>
  clubDeets: any
  setClubDeets: any
  editing?: boolean
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>
}

const AddBookButton: React.FC<Props> = ({ clubDeets, setClubDeets, editing = true, setEditing }) => {
  return (
    <div className='add-book'>
      <input
        className='secondary'
        type='file'
        id='book-input'
        form={`${(setEditing != null) ? 'edit-' : ''}club-form`}
        accept='.pdf'
        required
        onChange={(e) => {
          if (setEditing != null) setEditing(true)
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
      {
        (clubDeets.file != null && editing)
          ? <p className='create-book-details'>{clubDeets.file.name}</p>
          : null
      }
      <label className={`create-book-label ${(setEditing != null) ? 'club-book-label' : ''}`} htmlFor='book-input'>
        {(setEditing == null) && <MdFileUpload />}
        {(setEditing != null) ? 'Change Book' : 'Add Book'}
      </label>
    </div>
  )
}

export default AddBookButton
