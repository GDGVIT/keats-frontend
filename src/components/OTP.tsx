import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from './../Context'
import { auth } from '../utils/apiCalls'
import './../styles/Form.css'
import Loader from './Loader'

const OTP: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [, setStage] = stageState

  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(false)

  const history = useHistory()

  const handleSubmit = async (e: React.BaseSyntheticEvent): Promise<any> => {
    try {
      e.preventDefault()
      setDisabled(true)
      const OTP: string = e.target[0].value
      const result = await (window as any).confirmationResult.confirm(OTP)
      const user = result.user
      const token = await user.getIdToken(true)
      auth(token).then(() => {
        setStage('loggedIn')
        history.push('/clubs')
      }).catch(() => { })
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
          type='tel'
          placeholder='Enter OTP'
          value={value}
          onChange={handleChange}
          autoComplete='off'
          required
        />
      </label>
      {error !== '' && <p className='error'>{error}</p>}
      {
        disabled
          ? <Loader />
          : <button type='submit' disabled={disabled}>Verify OTP</button>
      }
    </form>
  )
}

export default OTP
