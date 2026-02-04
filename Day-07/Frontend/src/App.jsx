import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
const [notes, setNotes] = useState([]);
function getNotes(){
  axios.get("http://localhost:3000/api/notes")
  .then(res=>{
    setNotes(res.data.notes);
  })
}

useEffect(()=>{
  getNotes();
},[])

function submitHandler(e){
  e.preventDefault();
  const {title,description}=e.target.elements;

  axios.post("http://localhost:3000/api/notes",{
    title: title.value,
    description: description.value
  })
  .then(()=>{
    getNotes();
  })
}

function deleteHandler(id){
  axios.delete("http://localhost:3000/api/notes/"+id)
  .then(()=>{
    getNotes();
  })
}

  return (
    <div className='wrapper'>
      <form onSubmit={(e)=>{
          submitHandler(e);
      }}>
        <input name="title" type="text" placeholder='Enter the title'/>
        <input name="description" type="text" placeholder='Enter the description' />
        <button>Create</button>
      </form>
      <div className='container'>
      {notes.map((elem)=>{
        return <div className='card'>
          <h1>{elem.title}</h1>
          <p>{elem.description}</p>
          <button onClick={()=>{deleteHandler(elem._id)}}>Delete</button>
        </div>
      })}
      </div>
    </div>
  )
}

export default App