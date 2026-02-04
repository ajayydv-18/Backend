/**
 * server ko create krna 
 * server ko config krna
 */

const express = require("express");
const noteModel = require("./notes.model.js/notes.model");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static("./public"))
/**
 * Post-> /api/notes
 */
app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body;
    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        "message":"note created successfuly",
        note
    })
})

/**
 * get -> /api/notes
 */

app.get("/api/notes",async(req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        "message":"notes fetched successfully",
        notes
    })
})

/**
 * Delete -> /api/notes/:id
 */
app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        "message":"note deleted successfully",
    })
})
/**
 * Patch :- update a particular section
 */

app.patch("/api/notes/:id",async(req,res)=>{
    const {description} = req.body;
    const id = req.params.id;
    await noteModel.findByIdAndUpdate(id,{description});

    res.status(200).json({
        "message":"note updated successfully",

    })

})
//wild card -> ye un apui ko handle karega jo create nahi hua hai ab t ak
app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})
//jha par jab hum request krte hai to wo do cheeze ur mangta hai js ki fle aur css ki file uske liye ek aur middleware use krte hai  app.use(express("/public"))

module.exports = app;