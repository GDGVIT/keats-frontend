import React, { useContext } from 'react'
import { AppContext } from './../Context'
import './../styles/Form.css'

const OTP: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [, setStage] = stageState

  const handleSubmit = async (e: React.BaseSyntheticEvent): Promise<any> => {
    try {
      e.preventDefault()
      const OTP: string = e.target[0].value
      const result = await (window as any).confirmationResult.confirm(OTP)
      const user = result.user
      const token = user.getIdToken(true).i
      console.log(token)
      setStage('loggedIn')
    } catch (e) {
      alert('Incorrect OTP!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input name='otp' placeholder='Enter OTP' required />
      </label>
      <button type='submit'>Verify OTP</button>
    </form>
  )
}

export default OTP
