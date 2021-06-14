import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AppContext } from './../Context'
import { joinNewClub } from './../utils/apiCalls'
import Loader from './Loader'
import './../styles/Join.css'

const JoInput: React.FC<{submit: React.Dispatch<React.SetStateAction<number>>}> = ({ submit }) => {
  const { joinClubState } = useContext(AppContext)
  const [joinClub, setJoinClub] = joinClubState

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    const re = /^[A-Za-z0-9_-]{1,36}$/
    if (e.target.value === '' || re.test(e.target.value)) setJoinClub(e.target.value)
  }

  const handleSubmit = async (e: React.BaseSyntheticEvent): Promise<any> => {
    try {
      e.preventDefault()
      setLoading(true)
      const clubId: string = e.target[0].value
      const response = await joinNewClub(clubId)
      if (response !== 'success') throw new Error(response)
      submit(Math.random())
      setJoinClub('')
      setLoading(false)
      setRedirect(true)
    } catch (e) {
      const error = String(e).replaceAll('Error: ', '')
      setError(error)
      const clubInput = document.getElementById('join-club')
      if (clubInput != null) clubInput.style.border = '0.125rem solid #eb032e'
      setLoading(false)
    }
  }

  return (
    <form className='join-form' onSubmit={handleSubmit}>
      {redirect ? <Redirect to='/clubs' /> : null}
      <label>
        <input
          name='join-club'
          id='join-club'
          placeholder='Enter Club ID'
          value={joinClub}
          onChange={handleChange}
          autoComplete='off'
          required
        />
      </label>
      {error !== '' && <p className='error'>{error}</p>}
      {
        loading
          ? <Loader />
          : <button className='join-button' type='submit'>Join</button>
      }
    </form>
  )
}

export default JoInput
