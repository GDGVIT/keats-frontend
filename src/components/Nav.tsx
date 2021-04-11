import React from 'react'
import './../styles/Nav.css'
import Logo from './../assets/logo.svg'
import User from './../assets/user.jpg'

interface Props {
  user: boolean
  // onClick: Function
}

const Nav: React.FC<Props> = ({ user }) => {
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
