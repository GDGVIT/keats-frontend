import React, { useState, useEffect } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { MdComment } from 'react-icons/md'
import { getClub } from './../utils/apiCalls'
import Pdf from './../components/Pdf'
import Loader from './../components/Loader'
import './../styles/Read.css'

interface ClubProps {
  id: string
  clubname: string
  club_pic: string
  file_url: string
  page_no: number
  private: boolean
  page_sync: boolean
  host_id: string
  host_name: string
  host_profile_pic: string
}

const Read: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [club, setClub] = useState<ClubProps>({
    id: id,
    clubname: '',
    club_pic: '',
    file_url: '',
    page_no: 0,
    private: false,
    page_sync: false,
    host_id: '',
    host_name: '',
    host_profile_pic: ''
  })
  const [redirect, setRedirect] = useState(false)
  const [pdf, setPdf] = useState(true)

  useEffect(() => {
    const getDeets = async (): Promise<void> => {
      const { exists, club }: { exists: boolean, club: any } = await getClub(id)
      if (!exists) {
        setRedirect(!exists)
        return
      }
      setClub(club)
    }
    getDeets().then(() => { }, () => { })
  }, [id])

  const urlToken = new URLSearchParams(document.location.search).get('token')
  const urlUserId = new URLSearchParams(document.location.search).get('userId')

  return (
    <>
      {
        redirect
          ? <Redirect to='/clubs' />
          : club.file_url === ''
            ? <section className='clubp-loader'><Loader /></section>
            /* eslint-disable  @typescript-eslint/indent */
            : <section>
              <div className='clubs-header'>
                <h2 className={`${new URLSearchParams(document.location.search).get('userId') !== null ? 'webview' : ''}`}>
                  <Link to={`/club/${id}`}>{club.clubname}</Link>
                </h2>
                <div className='clubp-icons'>
                  <div>
                    {/* <Link to={`/club/${id}/chat`}> */}
                    <Link to={`/club/${id}/chat${urlToken === null ? '' : `?token=${urlToken}&userId=${urlUserId}`}`}>
                      <MdComment />
                    </Link>
                  </div>
                </div>
              </div>
              {
                  pdf ? <Pdf url={club.file_url} setPdf={setPdf} id={id} />
                    : <div>Something went wrong! Please try changing your file.</div>
                }
              </section>
            /* eslint-enable  @typescript-eslint/indent */
      }
    </>
  )
}

export default Read
