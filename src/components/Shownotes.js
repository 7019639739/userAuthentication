import axios from 'axios'
import React ,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Mynotes from './Mynotes'
import Swal from 'sweetalert2'


const Shownotes=(prop)=>{

    const [details, setDetails] = useState([])
    const [newNote, setNewNote] = useState('')

    const[toggle,setToggle]=useState(false);
    const [editId,setEditId]=useState('');


    
   
   

// useEffect(() => {
//     if(details._id){
//         axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${details._id}`,{
//             headers:{
//                 'x-auth':localStorage.getItem('tokens')
//             }
//         })
//         .then((res)=>{
//             console.log("in show axios",res.data)
//             const ans=res.data
//             setDisplay(ans)
//         })
//         .catch((err)=>{
//             alert("In show1 axios",err.message)
//         })

//     }
  
// }, [])

   

//console.log("for send c to c details",details._id)

useEffect(() => {

    axios.get("http://dct-user-auth.herokuapp.com/api/notes",{
                 headers:{
                         'x-auth':localStorage.getItem('tokens')
                     }})
        .then((res)=>{
            console.log("in show api",res.data)
            const ans=res.data
            setDetails(ans)
         

        })
        .catch((err)=>{
            alert(err)
        })

       
}, [details])

const handleDelete=(delId)=>{
    console.log("delete id",delId)
   
       axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${delId}`,{
        headers:{
                'x-auth':localStorage.getItem('tokens')
            }})
            .then((res)=>{
                console.log("in delete axios",res)
              
            })
            .catch((err)=>{
                alert(err)
            })
  
}

 const handleShow=(editId)=>{
     
     axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${editId}`,{
        headers:{
                'x-auth':localStorage.getItem('tokens')
            }})
            .then((res)=>{
                console.log("in edit axios",res.data);
                Swal.fire({
                    title: res.data.title,
                    text: res.data.body,
                   
                  })
            })
            .catch((err)=>{
                alert(err)
            })
 }

 const handleEdit=(editId)=>{

    axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${editId}`,{
        headers:{
                'x-auth':localStorage.getItem('tokens')
            }})
            .then((res)=>{
             // prop.history.push('/mynotes')
             const ans=res.data;
             setNewNote(ans.title)
             console.log("news",ans);
             setEditId(ans._id);
             setToggle(true)
            
                
            })
            .catch((err)=>{
                alert(err)
            })

 }

 const handleEditChange=(e)=>{
     console.log("in form",e.target.value);
     setNewNote(e.target.value);
    
 }
 const handleSubmit = (e) => {
    const mynotess={
        title: newNote,
    }
    console.log(mynotess)
    axios.put(`http://dct-user-auth.herokuapp.com/api/notes/${editId}`,mynotess,{
        headers:{
                'x-auth':localStorage.getItem('tokens')
            }})
            .then((res)=>{
                console.log("edit title",res)
            })
 }



    return(
        <div>
            <h3>Show Notes(My notes)</h3>

           <ul>
           {details.map((d)=>{
                return(
                    <div key={d._id}>
                        <li>  {d.title}</li>
                        <button onClick={()=>{
                            handleShow(d._id)
                        }}>Show</button>
                        <button onClick={()=>{
                            handleDelete(d._id)
                        }}>delete</button>

<button onClick={()=>{
                            handleEdit(d._id)
                        }}>edit</button>
                     
                                   </div>
                )
            })}

               
               </ul> 
          
{ toggle ?   <form onSubmit={handleSubmit}>
            <input type="text" value={newNote}  onChange={handleEditChange}/> <br/><br/>
            <input type="submit" value="save"/>
               </form>  :
           
               <Mynotes />  }


        
          
        </div>
    )
}

export default Shownotes




  
              