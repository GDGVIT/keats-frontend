import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from './../Context'
import { getUser } from './../utils/apiCalls'
import './../styles/Nav.css'
import Logo from './../assets/logo.svg'
import User from './../assets/user.jpg'

const Nav: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [stage, setStage] = stageState

  const [userPfp, setUserPfp] = useState(User)

  const getUserPfp = async (): Promise<void> => {
    const user = await getUser()
    setUserPfp(user.profile_pic)
  }

  useEffect(() => {
    if (localStorage.getItem('userId') !== null)
      setStage('loggedIn')
    if(stage === 'loggedIn')
      getUserPfp().then(() => { }, () => { })
  }, [stage])

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
          ? <Link className='profile-pic' to='/profile'><img src={userPfp} alt='Profile' /></Link>
          : stage === 'getStarted'
            ? <div className='sign-in' onClick={() => setStage('phoneNo')}>Sign In</div>
            : null
      }
    </header>
  )
}

export default Nav
