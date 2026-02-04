import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {
    const [note, setNote] = useState([]);

    //getting data from API
    function getNotes(){
        axios.get("http://localhost:3000/api/notes")
        .then((res)=>{
            setNotes(res.data)
        })
    }

    useEffect(()=>{
        getNotes();
    },[])

    //submit handler
    function submitHandler(e){
        e.preventDefault();

        const{title,description} = e.target.elements;

        axios.post("http://localhost:3000/api/notes",{title:title.value, description:description.value})
        .then(()=>{
            getNotes();
        })
    }


  return (
    <div>
        <form onSubmit={(e)=>{
            submitHandler(e);
        }}>
            <input type="text" placeholder="Enter the title" />
            <input type="text" placeholder="Enter the description" />
            <button>Create Note</button>
        </form>
    </div>
  )
}

export default App