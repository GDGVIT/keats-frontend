import { useEffect, useContext } from 'react'
import { AppContext } from './Context'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import Nav from './components/Nav'
import Landing from './pages/Landing'
import YourClubs from './pages/YourClubs'
import Club from './pages/Club'
import JoinClub from './pages/JoinClub'
import CreateClub from './pages/CreateClub'
import Profile from './pages/Profile'

const App = (): JSX.Element => {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyBEQwyFQC-UYyLmR-kuRBzF4k8EsK7aupc',
      authDomain: 'keats-caa65.firebaseapp.com',
      projectId: 'keats-caa65',
      storageBucket: 'keats-caa65.appspot.com',
      messagingSenderId: '332419944553',
      appId: '1:332419944553:web:163d6da6f17703bbb0d2f8',
      measurementId: 'G-XKLGPQJZX6'
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    firebase.auth().useDeviceLanguage()
  }, [])

  const { stageState } = useContext(AppContext)
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const [stage] = stageState
  /* eslint-enable  @typescript-eslint/no-unused-vars */

  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/'>
          {localStorage.getItem('token') !== null && <Redirect to='/clubs' />}
          <Landing />
        </Route>
        <>
          {localStorage.getItem('token') === null && <Redirect to='/' />}
          <Route exact path='/clubs'>
            <YourClubs />
          </Route>
          <Route path='/club/:id'>
            <Club />
          </Route>
          <Route exact path='/join'>
            <JoinClub />
          </Route>
          <Route exact path='/create'>
            <CreateClub />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
        </>
      </Switch>
    </Router>
  )
}

export default App
