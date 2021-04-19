import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from './../Context'
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
  join: boolean
}

interface WrapperProps {
  condition: boolean
  setState: React.Dispatch<React.SetStateAction<string>>
  id: string
  children: React.ReactNode
}

interface JoinProps {
  setState: React.Dispatch<React.SetStateAction<string>>
  id: string
  children: React.ReactNode
}

interface YourProps {
  id: string
  children: React.ReactNode
}

const YourWrapper = ({ id, children }: YourProps): JSX.Element =>
  <Link className='club-a' to={`/club/${id}`}>
    <article className='club-container'>{children}</article>
  </Link>

const JoinWrapper = ({ setState, id, children }: JoinProps): JSX.Element =>
  <article
    className='club-a club-container'
    onClick={() => {
      setState(id)
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }}
  >
    {children}
  </article>

const ConditionalWrapper = ({ condition, setState, id, children }: WrapperProps): JSX.Element =>
  condition ? JoinWrapper({ setState, id, children }) : YourWrapper({ id, children })

const ClubItem: React.FC<Props> = ({ club, join }) => {
  const { joinClubState } = useContext(AppContext)
  const [, setJoinClub] = joinClubState

  return (
    <ConditionalWrapper condition={join} setState={setJoinClub} id={club.id}>
      <>
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
      </>
    </ConditionalWrapper>
  )
}

export default ClubItem
