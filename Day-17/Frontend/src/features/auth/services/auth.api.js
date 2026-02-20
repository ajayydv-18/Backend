import axios from 'axios'

/**
 * Is filw me wo code likhenge jiske help se hamara frontend backend se communicate krta hai
 */

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function register(email,username,password){

    try{
        const res = await api.post("/register",{
            username,
            email,
            password
        })

        return res.data
    }
    catch(err){
        throw err;
    }

}

export async function login(username,password){

    try{
        const res = await api.post("/login",{
            username,
            password
        })

        return res.data
    }
    catch(err){
        throw err;
    }
}

export async function getMe(){
    try{
        const res = await api.get("/get-me");
        return res.data
    }
    catch(err){
        throw err
    }
}