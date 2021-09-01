import axios from 'axios'
import React,{useState,useEffect} from 'react'


const Account=()=>{
    const [user, setUser] = useState({})

useEffect(() => {
  

    axios.get("http://dct-user-auth.herokuapp.com/users/account",{
        headers:{
            'x-auth':localStorage.getItem("tokens")
        }
    })
    .then((res)=>{
        console.log("in Acc",res.data)
        const ans=res.data
        setUser(ans)
    })
    .catch((err)=>{
        console.log("catch block",err)
    })
}, [])


    return(
        <div>
            <h2>User Account</h2>

            <p>Name-- {user. username}</p>
            <p>Email--{user.email}</p>
        </div>
    )
}

export default Account