import React,{ useState } from 'react'
import axios from 'axios'
import '../styles/form.scss'

const Register = () => {
    
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    function submitHandler(e){
        e.preventDefault();

    }
                        
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={(e)=>{
                submitHandler(e);
            }} >

                <input
                onChange={(dets)=>{
                    setEmail(dets.target.value)
                }} 
                type="email" 
                placeholder='Enter your email' 
                value={email}
                />


                <input 
                onChange={(dets)=>{
                    setUsername(dets.target.value);
                }}
                type="text" 
                placeholder='Enter your username' 
                value={username}
                />

                <input 
                onChange={(dets)=>{
                    setPassword(dets.target.value);
                }}
                type="password" 
                placeholder='Enter your password' 
                value={password}
                />

                <button>Register</button>
            </form>
        </div>
    </main>
  )
}

export default Register