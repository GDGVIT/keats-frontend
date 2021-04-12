import React, { useContext } from 'react'
import { AppContext } from './../Context'
import './../styles/Nav.css'
import Logo from './../assets/logo.svg'
import User from './../assets/user.jpg'

const Nav: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [stage, setStage] = stageState

  return (
    <header>
      {/* TODO: add route to '/' here */}
      <div className='logo'>
        <img src={Logo} alt='Keats' />
        Keats
      </div>
      {
        stage === 'loggedIn' // TODO: add route to '/profile' here
          ? <img className='profile-pic' src={User} alt='Profile' />
          : stage === 'getStarted' 
            ? <div className='sign-in' onClick={() => setStage('phoneNo')}>Sign In</div>
            : null
      }
    </header>
  )
}

export default Nav
