import React, { useState } from 'react'
import '../styles/form.scss'
import axios from 'axios'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function submitHandler(e){
        e.preventDefault();

        axios.post("http://localhost:3000/api/auth/login",{
            username:username,
            password: password
            //ye krte hai taaki cookies set ho jae
        },{withCredentials: true}).then(res=>{
            console.log(res.data)
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