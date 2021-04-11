import { useContext } from 'react'
import { AppContext } from './Context'
import Nav from './components/Nav'

const App = (): JSX.Element => {
  const { userState } = useContext(AppContext)
  const [user, setUser] = userState

  return (
    <div className='App'>
      <Nav user={user} />
      Keats1
    </div>
  )
}

export default App
