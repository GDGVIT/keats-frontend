import { baseUrl } from './constants'

export const auth = async (token: string): Promise<boolean> => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    id_token: token
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    mode: 'cors'
  }

  try {
    const response = await fetch(`${baseUrl}/api/user`, requestOptions as any)
    const data = await response.json()
    localStorage.setItem('token', data.data.token)
    localStorage.setItem('userId', data.data.user_id)
    return true
  } catch (e) {
    return false
  }
}

export const clubs = async (): Promise<any> => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/user`, requestOptions as any)
    const data = await response.json()
    const clubs = data.data.clubs
    console.log(clubs)
    return clubs
  } catch (e) {
    return {}
  }
}