import { useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import Nav from './components/Nav'
import Landing from './pages/Landing'

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
    firebase.auth().useDeviceLanguage();

  }, [])

  return (
    <>
      <Nav />
      <Landing />
    </>
  )
}

export default App
