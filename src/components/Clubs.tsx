import React from 'react'
import ClubItem from './ClubItem'
import './../styles/Clubs.css'

interface clubItem {
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

interface Props {
  clubs: {
    clubItem?: clubItem
  }
  join: boolean
}

const Clubs: React.FC<Props> = ({ clubs, join }) => {
  return (
    <div className='clubs'>
      {
        Object.entries(clubs).map(([key, club]) =>
          <ClubItem key={key} club={(club as clubItem)} join={join} />
        )
      }
    </div>
  )
}

export default Clubs
