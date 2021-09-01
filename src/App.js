import React ,{useState,useEffect} from 'react'
import Navbar from './components/Navbar'
import { Link,Route } from 'react-router-dom'




const App=()=>{
  const [loggedIn, setLoggedIn] = useState(false)


  const handleAuth=()=>{
    setLoggedIn(!loggedIn)
  }

  useEffect(() => {
    if(localStorage.getItem('tokens')){
   handleAuth()
    
    }
  }, [])

  return(
    <div>
      <h1>UserAuth </h1>

      <Navbar loggedIn={loggedIn} handleAuth={handleAuth}/>


     
    </div>
  )
}

export default App