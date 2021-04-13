import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getClubs } from './../utils/apiCalls'
import Loader from './../components/Loader'
import Clubs from './../components/Clubs'
import NoClubs from './../components/NoClubs'

const YourClubs: React.FC = () => {
  const [clubs, setClubs] = useState({})
  const [loading, setLoading] = useState(true)

  const getClubsInside = async (): Promise<void> => {
    const userClubs = await getClubs()
    setClubs(userClubs)
    setLoading(false)
  }

  useEffect(() => {
    getClubsInside().then(() => { }, () => { })
  })

  return (
    <section className='your-clubs'>
      <div className='clubs-header'>
        <h2>Clubs</h2>
        <div>
          <Link to='/join' className='clubs-redirect'>Join</Link>
          &nbsp;|&nbsp;
          <Link to='/create' className='clubs-redirect'>Create</Link>
        </div>
      </div>

      {
        loading
          ? <Loader />
          : Object.keys(clubs).length !== 0
            ? <Clubs clubs={clubs} />
            : <NoClubs />
      }
    </section>
  )
}

export default YourClubs
