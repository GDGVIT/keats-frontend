import React from 'react'
import { Link } from 'react-router-dom'
import Hero from './../assets/bookshelf.svg'
import './../styles/NoClubs.css'

const NoClubs: React.FC = () => {
  return (
    <div className='no-clubs'>
      <div className='bookshelf'>
        <img src={Hero} alt='Keats_Bookshelf'/>
      </div>
      <h3>Join your first book club!</h3>
      <div className='noclubs-action'>
        <div>
          <Link to='/create'>
            <button>Create a Club</button>
          </Link>
        </div>
        <div>
          <Link to='/join'>
            <button className='secondary'>Join Club</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NoClubs
