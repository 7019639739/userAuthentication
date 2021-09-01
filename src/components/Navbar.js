import React from 'react'
import { Link, Route,withRouter } from 'react-router-dom'

import Home from './Home'
import Register from './Register'
import Login from './Login'
import Account from './Account'

import Shownotes from './Shownotes'


const Navbar = (prop) => {
    const { loggedIn,handleAuth } = prop

    return (
        <div>
            <h3>Nav Page</h3>


            <ul>
                <li><Link to='/'>Home</Link></li>


                {loggedIn ? (<div> <li> <Link to='/account'>Account</Link> </li>
                      <Link to='/shownotes'> <li>show my Notes</li></Link> 
                    <li> <Link onClick={()=>{
                        localStorage.removeItem('tokens')
                        alert("successfully log out")
                        prop.history.push('/')
                        handleAuth()
                    }}>Logout</Link>  </li> </div>) : 
                    (<div> <li> <Link to='/Register'>Register</Link> </li>
                        <li> <Link to='/Login'>Login</Link>  </li> </div>)}


            </ul>
            <Route path='/' component={Home} exact={true} />
            <Route path="/register" component={Register} />
            <Route path='/login' render={(prop)=>{
                return <Login {...prop} handleAuth={handleAuth}/>
            }} />
            <Route path='/account' component={Account} />
            <Route path='/shownotes' component={Shownotes}/>
            
        </div>
    )
}

//const WrappedComponent = withRouter(Navbar)
// export default WrappedComponent 
export default  withRouter(Navbar)
