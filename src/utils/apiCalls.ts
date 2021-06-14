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

export const getUser = async (): Promise<any> => {
  const myHeaders = new Headers()
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/user`, requestOptions as any)
    const data = await response.json()
    const user = data.data
    return user
  } catch (e) {
    return {}
  }
}

interface UpdateProps {
  username: string
  bio: string
  email: string
  profilePic: string | File
}

export const updateUser = async (raw: UpdateProps): Promise<any> => {
  const myHeaders = new Headers()
  // myHeaders.append('Content-Type', ' multipart/form-data')
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)

  const formData = new FormData()
  formData.append('username', raw.username)
  formData.append('bio', raw.bio)
  formData.append('email', raw.email)
  formData.append('profile_pic', raw.profilePic)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/user`, requestOptions as any)
    const data = await response.json()
    const user = data.data
    return user
  } catch (e) {
    return {}
  }
}

export const getUserClubs = async (): Promise<any> => {
  const myHeaders = new Headers()
  // const token = String(localStorage.getItem('token')) || new URLSearchParams(document.location.search.substring(1)).get('token')
  // console.log(new URLSearchParams(document.location.search.substring(1)).get('token'))
  // myHeaders.append('Authorization', `Bearer ${token}`)
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYxNGQ5OTAzLWYxNzQtNGRkNy04ZTZjLWRmYmJjYjcyNThlOCJ9.NsjgkCCg21l99fzk_qLLt9LLUWz_SS-UrZIXFaAp0uk

  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)

  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/user/clubs`, requestOptions as any)
    const data = await response.json()
    const clubs = data.data.clubs
    return clubs
  } catch (e) {
    // console.clear()
    return {}
  }
}

export const getPublicClubs = async (): Promise<any> => {
  const myHeaders = new Headers()
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/clubs/list`, requestOptions as any)
    const data = await response.json()
    const clubs = data.data
    return clubs
  } catch (e) {
    console.clear()
    return {}
  }
}

export const joinNewClub = async (clubId: string): Promise<any> => {
  const myHeaders = new Headers()
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    club_id: clubId
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/clubs/join`, requestOptions as any)
    const data = await response.json()
    const status = data.status
    if (status === 'error') throw new Error(data.message)
    return status
  } catch (e) {
    return e
  }
}

interface CreateClubProps {
  clubName: string
  // file: File | null
  // clubPic: File | null
  file: any
  clubPic: any
  private: boolean
  pageSync: boolean
}

export const createClub = async (raw: CreateClubProps): Promise<any> => {
  const myHeaders = new Headers()
  // myHeaders.append('Content-Type', ' multipart/form-data')
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)

  const formData = new FormData()
  formData.append('clubname', raw.clubName)
  formData.append('file', raw.file)
  formData.append('club_pic', raw.clubPic)
  formData.append('private', String(raw.private))
  formData.append('page_sync', String(raw.pageSync))

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/clubs/create`, requestOptions as any)
    const data = await response.json()
    const club = data.data
    return club
  } catch (e) {
    return String(e)
  }
}

export const getClub = async (id: string): Promise<any> => {
  const myHeaders = new Headers()
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/clubs?club_id=${id}`, requestOptions as any)
    const data = await response.json()
    const club = data.data.club
    const chat = data.data.chat
    const usersRes = data.data.users
    return { exists: true, club, usersRes, chat }
  } catch (e) {
    return { exists: false }
  }
}

export const togglePrivate = async (clubId: string): Promise<any> => {
  const myHeaders = new Headers()
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    club_id: clubId
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/clubs/toggleprivate`, requestOptions as any)
    const data = await response.json()
    const status = data.status
    return status
  } catch (e) {
    return false
  }
}

/* eslint-disable camelcase */
interface UpdateClubProps {
  id: string
  clubname: string
  club_pic: any
  file: any
}
/* eslint-enable camelcase */

export const updateClub = async (raw: UpdateClubProps): Promise<any> => {
  const myHeaders = new Headers()
  // myHeaders.append('Content-Type', ' multipart/form-data')
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)

  const formData = new FormData()
  formData.append('id', raw.id)
  formData.append('clubname', raw.clubname)
  formData.append('club_pic', raw.club_pic)
  formData.append('file', raw.file)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/clubs/update`, requestOptions as any)
    const data = await response.json()
    const club = data.data
    return club
  } catch (e) {
    return {}
  }
}

export const kickUser = async (clubId: string, userId: string): Promise<any> => {
  const myHeaders = new Headers()
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    club_id: clubId,
    user_id: userId
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/clubs/kickuser`, requestOptions as any)
    const data = await response.json()
    const status = data.status
    return status
  } catch (e) {
    return false
  }
}

export const leaveClub = async (clubId: string): Promise<any> => {
  const myHeaders = new Headers()
  const token = new URLSearchParams(document.location.search).get('token') ?? String(localStorage.getItem('token'))
  myHeaders.append('Authorization', `Bearer ${token}`)
  // myHeaders.append('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    club_id: clubId
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${baseUrl}/api/clubs/leave`, requestOptions as any)
    const data = await response.json()
    const status = data.status
    return status
  } catch (e) {
    return false
  }
}
