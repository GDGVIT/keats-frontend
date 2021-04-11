import React, { useContext } from 'react'
import { AppContext } from './../Context'
import './../styles/Nav.css'
import Logo from './../assets/logo.svg'
import User from './../assets/user.jpg'

const Nav: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [stage] = stageState

  return (
    <header>
      {/* TODO: add route to '/' here */}
      <div className='logo'>
        <img src={Logo} alt='Keats' />
        Keats
      </div>
      {
        stage !== 'getStarted' // TODO: add route to '/profile' here
          ? <img className='profile-pic' src={User} alt='pfp' />
          : <div className='sign-in'>Sign In</div>
      }
    </header>
  )
}

export default Nav
