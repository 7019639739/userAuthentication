import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Login=(prop)=>{
    const [logName, setLogName] = useState('')
    const [logPswd, setLogPswd] = useState('')


const handleChange=(e)=>{
    if(e.target.name == 'names'){
       setLogName(e.target.value) 
      
    }else if(e.target.name == 'pswds'){
        setLogPswd(e.target.value)
    }
}


const handleSubmit=(e)=>{
    e.preventDefault()

    const formdata={
        email: logName,
        password : logPswd
    }

    console.log(formdata)

    axios.post('http://dct-user-auth.herokuapp.com/users/login',formdata)
        .then((res)=>{
            console.log("in log data",res.data)
            const result=res.data

            if(result.hasOwnProperty('errors')){   //Object.keys(result).includes('errors')
                alert(res.errors)
            }else {
                alert("succesfuly login")
                localStorage.setItem('tokens',result.token)
                prop.history.push('/')
                prop.handleAuth()
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
}

    return(
        <div>
            <h2>Login page</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="enter email" value={logName} onChange={handleChange} name="names"/>        <br />
                <input type="text" placeholder="enter password" value={logPswd} onChange={handleChange} name="pswds"/>         <br />

                <input type="submit" />
            </form>
           
        </div>
    )
}

export default Login