import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from './../Context'
import { getPublicClubs } from './../utils/apiCalls'
import JoInput from './../components/JoInput'
import Loader from './../components/Loader'
import Clubs from './../components/Clubs'

const JoinClub: React.FC = () => {
  const { joinClubState } = useContext(AppContext)
  const [joinClub, setJoinClub] = joinClubState

  const [clubs, setClubs] = useState({})
  const [loading, setLoading] = useState(true)

  const getClubs = async (): Promise<void> => {
    const userClubs = await getPublicClubs()
    setClubs(userClubs)
    setLoading(false)
  }

  useEffect(() => {
    getClubs().then(() => { }, () => { }).catch(() => { })
  }, [])

  return (
    <section className='your-clubs'>
      <div className='clubs-header'>
        <h2>Join a Club</h2>
      </div>
      
      <JoInput />

      <div className='clubs-header'>
        <h2>Public Clubs</h2>
      </div>
      {
        loading
          ? <Loader />
          : typeof clubs !== 'undefined' && Object.keys(clubs).length !== 0
            ? <Clubs clubs={clubs} join />
            : <h3>Nothing to show here!</h3>
      }
    </section>

  )
}

export default JoinClub
