import React, { useEffect, useState } from 'react'
import { getPublicClubs } from './../utils/apiCalls'
import Loader from './../components/Loader'
import Clubs from './../components/Clubs'

const JoinClub: React.FC = () => {
  const [clubs, setClubs] = useState({})
  const [loading, setLoading] = useState(true)

  const getClubs = async (): Promise<void> => {
    const userClubs = await getPublicClubs()
    setClubs(userClubs)
    console.log(clubs)
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


      <div className='clubs-header'>
        <h2>Public Clubs</h2>
      </div>
      {
        loading
          ? <Loader />
          : typeof clubs !== 'undefined' && Object.keys(clubs).length !== 0
            ? <Clubs clubs={clubs} join={true}/>
            : <h3>Nothing to show here!</h3>
      }
    </section>

  )
}

export default JoinClub
