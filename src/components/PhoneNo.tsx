import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from './../Context'
import firebase from 'firebase/app'
import 'firebase/auth'
import './../styles/Form.css'
import './../styles/PhoneNo.css'
// import PhoneInput from 'react-phone-number-input'
import PhoneInput, { isValidPhoneNumber  } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const PhoneNo: React.FC = () => {
  const { stageState } = useContext(AppContext)
  const [, setStage] = stageState

  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(false)

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
      setDisabled(true)
      const phoneNumber: string = value
      if (!isValidPhoneNumber(phoneNumber)) throw new Error('Invalid Phone')
      const appVerifier = (window as any).recaptchaVerifier
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      (window as any).confirmationResult = confirmationResult
      setStage('OTP')
    } catch (e) {
      // alert('Error: SMS not sent!')
      setError('Invalid Phone Number!')
      const phoneInput = (document.getElementsByClassName('PhoneInput') as HTMLCollectionOf<HTMLElement>)[0]
      if (phoneInput !== null) phoneInput.style.border = '0.125rem solid #eb032e'
      setDisabled(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <PhoneInput
          international
          defaultCountry='IN'
          value={value}
          onChange={setValue}
        />
      </label>
      {error !== '' && <p className='error'>{error}</p>}
      <button type='submit' id='sign-in-button' disabled={disabled}>Get OTP</button>
    </form>
  )
}

export default PhoneNo
