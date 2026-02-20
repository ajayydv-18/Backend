import React, { useState } from 'react'
import '../styles/form.scss'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {handleLogin} = useAuth();

    function submitHandler(e){
        e.preventDefault();

        handleLogin(username,password)
        .then(res=>{
            console.log(res)
        })


    }


  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={(e)=>{
                submitHandler(e);
            }}>
                <input onChange={(dets)=>{
                    setUsername(dets.target.value);
                }}
                type="text" 
                placeholder='Enter your username'
                value={username}
                />

                <input onChange={(dets)=>{
                    setPassword(dets.target.value);
                }}
                type="password"
                placeholder='Enter your password' 
                value={password}
                />

                <button>Login</button>
            </form>
        </div>
    </main>
  )
}

export default Login