import './../styles/Landing.css'
import Android from './../assets/googleplay.svg'
import IOS from './../assets/appstore.svg'
import Hero from './../assets/landing.svg'

const Landing = () => {
  return (
    <section className='home'>
      <div className='content-col'>
        <div className='content'>
          <p>Keats is an online book reading website where you can</p>
          <h2>Join Clubs, Read books and Chat with your friends</h2>
        </div>
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
