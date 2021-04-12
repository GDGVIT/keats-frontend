import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from './../Context'
import firebase from 'firebase/app'
import 'firebase/auth'
import './../styles/Form.css'
import './../styles/PhoneNo.css'
// import PhoneInput from 'react-phone-number-input'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const PhoneNo: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [, setStage] = stageState

  const [value, setValue] = useState('')

  useEffect(() => {
    (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible'
      // callback: (response: any) => {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      // Redirect to clubs
      // }
    })
  }, [])

  const handleSubmit = async (e: React.BaseSyntheticEvent): Promise<any> => {
    try {
      e.preventDefault()
      // const phoneNumber: string = e.target[0].value
      const phoneNumber: string = value
      const appVerifier = (window as any).recaptchaVerifier
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      (window as any).confirmationResult = confirmationResult
      setStage('OTP')
    } catch (e) {
      alert('Error: SMS not sent!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {/* <input name='phone' type='tel' placeholder='Enter your Phone Number' required /> */}
        <PhoneInput
          international
          defaultCountry='IN'
          value={value}
          onChange={setValue}
        />
      </label>
      <button type='submit' id='sign-in-button'>Get OTP</button>
    </form>
  )
}

export default PhoneNo
