import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPublicClubs } from './../utils/apiCalls'
import JoInput from './../components/JoInput'
import Loader from './../components/Loader'
import Clubs from './../components/Clubs'

const JoinClub: React.FC = () => {
  const [clubs, setClubs] = useState({})
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(0)

  const getClubs = async (): Promise<void> => {
    const userClubs = await getPublicClubs()
    setClubs(userClubs)
    setLoading(false)
  }

  useEffect(() => {
    getClubs().then(() => { }, () => { }).catch(() => { })
    return () => {
      setClubs(clubs => clubs)
      setLoading(false)
    }
  }, [submit])

  return (
    <section className='your-clubs'>
      <div className='clubs-header'>
        <h2>Join a Club</h2>
        <div>
          <Link to='/clubs' className='clubs-redirect'>My Clubs</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to='/create' className='clubs-redirect'>Create</Link>
        </div>
      </div>

      <JoInput submit={setSubmit} />

      <div className='clubs-header'>
        <h2>Public Clubs</h2>
      </div>
      {
        loading
          ? <section className='clubp-loader'><Loader /></section>
          : typeof clubs !== 'undefined' && Object.keys(clubs).length !== 0
            ? <Clubs clubs={clubs} join />
            : <h3>Nothing to show here!</h3>
      }
    </section>

  )
}

export default JoinClub
