import React, { useContext } from 'react'
import { AppContext } from './../Context'
import './../styles/Nav.css'
import Logo from './../assets/logo.svg'
import User from './../assets/user.jpg'

const Nav: React.FC = () => {
  const { userState } = useContext(AppContext)
  const [user] = userState

  return (
    <header>
      {/* TODO: add route to '/' here */}
      <div className='logo'>
        <img src={Logo} alt='Keats' />
        Keats
      </div>
      {
        user // TODO: add route to '/profile' here
          ? <img className='profile-pic' src={User} alt='pfp' />
          : <div className='sign-in'>Sign In</div>
      }
    </header>
  )
}

export default Nav
