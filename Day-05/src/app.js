
const express = require("express");

//creating the server
const app = express();
app.use(express.json());

const notes = [];

app.post("/notes",(req,res)=>{
    notes.push(req.body);
    res.status(201).json({
        "message":"notes created sucessfully",
    })
})

app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes:notes,
    })
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index];
    res.status(204).json({
        "message":"Note deleted successfully"
    })
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].title = req.body.title;
    res.status(200).json({
        message:"the note updated successfully"
    })
})



//sending the server
module.exports = app;