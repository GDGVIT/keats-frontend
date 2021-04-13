import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from './../Context'
import './../styles/Nav.css'
import Logo from './../assets/logo.svg'
import User from './../assets/user.jpg'

const Nav: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [stage, setStage] = stageState

  return (
    <header>
      <div className='logo'>
        <Link className='logo' to='/'>
          <img src={Logo} alt='Keats' />
          Keats
        </Link>
      </div>
      {
        localStorage.getItem('token') !== null
          ? <Link className='logo' to='/profile'><img className='profile-pic' src={User} alt='Profile' /></Link>
          : stage === 'getStarted'
            ? <div className='sign-in' onClick={() => setStage('phoneNo')}>Sign In</div>
            : null
      }
    </header>
  )
}

export default Nav
