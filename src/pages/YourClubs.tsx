import React, { useEffect, useState } from 'react'
import { getClubs } from './../utils/apiCalls'
import Loader from './../components/Loader'
import Clubs from './../components/Clubs'

const YourClubs: React.FC = () => {
  const [clubs, setClubs] = useState({})
  const [loading, setLoading] = useState(true)

  const getClubsInside = async (): Promise<void> => {
    const userClubs = await getClubs()
    setClubs(userClubs)
    setLoading(false)
  }

  useEffect(() => {
    getClubsInside().then(() => {}, () => {})
  })

  return (
    <section>
      <h2>Clubs</h2>

      {
        loading
          ? <Loader />
          : Object.keys(clubs).length !== 0
            ? <Clubs clubs={clubs} />
            : <p>EMPTY</p>
      }
    </section>
  )
}

export default YourClubs
