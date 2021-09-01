import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Register=(prop)=>{
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [pswd, setPswd] = useState('')



    const handleSubmit=(e)=>{
        e.preventDefault()
      const formdata={
          username:userName,
           email:email,
           password:pswd
       }

     

       axios.post('http://dct-user-auth.herokuapp.com/users/register', formdata)
           .then((response)=>{
              console.log("in axios post res",response.data)
             const result=response.data
            console.log("eee",result);
             if(result.hasOwnProperty('errors')){
                alert(result.message)
            }else{
                alert("successfully created an account")
                prop.history.push('/Login')
            }
          

           })
           .catch((err)=>{
              alert("its catch",err)
           })
       
    }

    const handleChange=(e)=>{

        if(e.target.name === 'userName'){
            setUserName(e.target.value)
        }else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else if(e.target.name === 'pswd'){
            setPswd(e.target.value)
        }
    }

    


    return(
        <div>
          
        <h3>Register page</h3>

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter UserName" onChange={handleChange}  value={userName} name="userName"/>      <br />
            <input type="text" placeholder="enter email" onChange={handleChange} value={email} name="email"/>          <br />
            <input type="text" placeholder="enter Password" onChange={handleChange} value={pswd} name="pswd"/>             <br />

            <input type="submit" value="Submit"/>
        </form>
        
        </div>
    )
}

export default Register