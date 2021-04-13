import React from 'react'
import './../styles/Clubs.css'

interface Props {
  club: {
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
}

const ClubItem: React.FC<Props> = ({ club }) => {
  return (
    <article className='club-container'>
      <div className='club-flex'>
        <div className='club-image'>
          <img src={club.club_pic} alt={club.clubname} />
        </div>
        <div className='club-content'>
          <p className='club-name'>{club.clubname}</p>
          <span className='club-host'>{club.host_name}</span>
        </div>
      </div>
      <div className='club-access'>{club.private ? 'Private' : 'Public'}</div>
    </article>
  )
}

export default ClubItem
