import React, { useContext, useState } from 'react'
import { AppContext } from './../Context'
import './../styles/Form.css'

const OTP: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [, setStage] = stageState

  const [value, setValue] = useState('')

  const handleSubmit = async (e: React.BaseSyntheticEvent): Promise<any> => {
    try {
      e.preventDefault()
      const OTP: string = e.target[0].value
      const result = await (window as any).confirmationResult.confirm(OTP)
      const user = result.user
      const token = await user.getIdToken(true)
      console.log(token)
      setStage('loggedIn')
    } catch (e) {
      alert('Incorrect OTP!')
    }
  }

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const re = /^[0-9]{1,6}$/
    if (e.target.value === '' || re.test(e.target.value)) setValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          name='otp'
          placeholder='Enter OTP'
          value={value}
          onChange={handleChange}
          required
        />
      </label>
      <button type='submit'>Verify OTP</button>
    </form>
  )
}

export default OTP
