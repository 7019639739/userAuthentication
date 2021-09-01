import axios from 'axios'
import React ,{useState,useEffect} from 'react'

import { Link, Route,withRouter } from 'react-router-dom'
import Shownotes from './Shownotes'


const Mynotes=(prop)=>{
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [notes, setNotes] = useState([])

  


    const handleChange=(e)=>{
        if(e.target.name=="titles"){
            setTitle(e.target.value)
        }else if(e.target.name == 'bodys'){
            setBody(e.target.value)
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const mynotess={
            title: title,
            body : body
        }
        console.log(mynotess)


         axios.post("http://dct-user-auth.herokuapp.com/api/notes",mynotess,{
             headers:{
                 'x-auth':localStorage.getItem('tokens')
             }
         })
             .then((res)=>{
                 console.log("in notes axios",res.data)
                 const ans=res.data
                 setNotes(ans)
                   
                 prop.history.push('/shownotes')
                
                
                
            })
             .catch((err)=>{
                 alert(err.message)
             })


            
    }

    return (
        <div>
            
            <h4>Add Note</h4>
         

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="enter Title"  value={title} onChange={handleChange} name="titles"/> <br/><br/>
                <textarea placeholder="enter body"  value={body}  onChange={handleChange} name="bodys"></textarea>  <br/><br/>

                <input type="submit" value="save"/>

               


            </form>

           
        </div>
    )
}

export default withRouter(Mynotes)