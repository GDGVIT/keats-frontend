import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AppContext } from './../Context'
import './../styles/Form.css'
import { auth } from '../utils/apiCalls'

// TODO: REDIRECT TO CLUBS ON SUBMIT

const OTP: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [stage, setStage] = stageState

  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async (e: React.BaseSyntheticEvent): Promise<any> => {
    try {
      e.preventDefault()
      setDisabled(true)
      const OTP: string = e.target[0].value
      const result = await (window as any).confirmationResult.confirm(OTP)
      const user = result.user
      const token = await user.getIdToken(true)
      // auth(token).then(() => setStage('loggedIn')).catch(() => console.log('Invalid Token'))
      auth(token).then(() => {
        setStage('loggedIn')
      })
    } catch (e) {
      setError('Incorrect OTP!')
      const otpInput = document.getElementById('OTP')
      if (otpInput != null) otpInput.style.border = '0.125rem solid #eb032e'
      setDisabled(false)
    }
  }

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    const re = /^[0-9]{1,6}$/
    if (e.target.value === '' || re.test(e.target.value)) setValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          name='otp'
          id='OTP'
          placeholder='Enter OTP'
          value={value}
          onChange={handleChange}
          autoComplete='off'
          required
        />
      </label>
      {error !== '' && <p className='error'>{error}</p>}
      <button type='submit' disabled={disabled}>Verify OTP</button>
      {stage === 'loggedIn' && <Redirect to='/clubs' />}
    </form>
  )
}

export default OTP
