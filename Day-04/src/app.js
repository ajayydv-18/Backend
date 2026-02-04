const express = require("express");

//server ko create krna
const app = express();
app.use(express.json());

const notes = [];

app.post("/notes",(res,req)=>{
    notes.push(req.body);
    res.status(201).json({
        "message":"notes created sucessfully."
    })
})



module.exports = app;