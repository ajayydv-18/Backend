/**
 * creating the server
 */

const express = require("express");
const noteModel = require("../src/model/notes.model")


//creation of server
const app = express();
app.use(express.json());

/**
 * Post
 * create a api in which we can create and save data in mongodb
 * api/notes
 * req.body -> {title , description};
 */

app.post("/api/notes",async(req,res)=>{
    const{title,description} = req.body; 
    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        "message":"Note created Successfully",
        note: note
    })
 })


module.exports = app;


