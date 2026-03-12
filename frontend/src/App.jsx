import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'
import VerifyEmail from './VerifyOTP'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <VerifyEmail />
     {/* <Signup /> */}
    </>
  )
}

export default App
