import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserClubs } from './../utils/apiCalls'
import Loader from './../components/Loader'
import Clubs from './../components/Clubs'
import NoClubs from './../components/NoClubs'

const YourClubs: React.FC = () => {
  const [clubs, setClubs] = useState({})
  const [loading, setLoading] = useState(true)
  const [device, setDevice] = useState('')

  const checkDevice = (): string => {
    if (window.innerWidth < 768) return 'phone'
    else if (window.innerWidth < 1200) return 'tablet'
    else return 'desktop'
  }

  useEffect(() => {
    window.addEventListener('load', () => setDevice(checkDevice()))
    window.addEventListener('resize', () => setDevice(checkDevice()))
    return () => setDevice(device => device)
  })

  useEffect(() => {
    setDevice(checkDevice())
    return () => setDevice(device => device)
  }, [])


  useEffect(() => {
    const getClubs = async (): Promise<void> => {
      const userClubs = await getUserClubs()
      setClubs(userClubs)
      setLoading(false)
    }
    getClubs().then(() => { }, () => { })
    return () => {
      setClubs({})
      setLoading(false)
    }
  }, [])

  return (
    <section className='your-clubs'>
      <div className='clubs-header'>
        <h2>Clubs</h2>
        <div>
          <Link to='/join' className='clubs-redirect'>Join</Link>
          {device === 'phone' && <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
          <Link to='/create' className='clubs-redirect'>Create</Link>
        </div>
      </div>

      {
        loading
          ? <section className='clubp-loader'><Loader /></section>
          : clubs !== null
            ? <Clubs clubs={clubs} join={false} />
            : <NoClubs />
      }
    </section>
  )
}

export default YourClubs
