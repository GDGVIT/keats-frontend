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
}

const Clubs: React.FC<Props> = ({ clubs }) => {
  return (
    <div className='clubs'>
      {
        Object.entries(clubs).map(([key, club]) => {
          return <ClubItem key={key} club={(club as clubItem)} />
        })
      }
    </div>
  )
}

export default Clubs
