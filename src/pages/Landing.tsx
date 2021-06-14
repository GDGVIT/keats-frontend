import { useContext } from 'react'
import { AppContext } from './../Context'
import './../styles/Landing.css'
import Android from './../assets/googleplay.svg'
import IOS from './../assets/appstore.svg'
import Hero from './../assets/landing.svg'
import PhoneNo from '../components/PhoneNo'
import Otp from '../components/OTP'

const Landing: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [stage, setStage] = stageState

  return (
    <section className='home'>
      <div className='content-col'>
        <div className='content'>
          <h2>Welcome to Keats!</h2>
          <h3>Join clubs, Read books and Chat with your Friends!</h3>
        </div>
        {
          stage === 'getStarted'
            ? (
              <button className='get-started' onClick={() => setStage('phoneNo')}>
                Get Started
              </button>
            )
            : stage === 'phoneNo'
              ? <PhoneNo />
              : <Otp />
        }
        <div className='app-links'>
          <a className='app-link' href='https://play.google.com/store/apps/details?id=com.dscvit.wt21' target='_blank' rel='noreferrer'>
            <img src={Android} alt='play store' />
          </a>
          <a className='app-link' href='https://apps.apple.com/in/app/womentechies-2021/id1556003243' target='_blank' rel='noreferrer'>
            <img src={IOS} id='ios' alt='app store' />
          </a>
        </div>
      </div>
      <div className='landing-hero'>
        <img src={Hero} alt='Keats' />
      </div>
    </section>
  )
}

export default Landing
