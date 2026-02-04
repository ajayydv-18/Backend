const express = require("express");

//server ko create krna
const app = express();

//req.body ka data express process nahi kar pata hai uske liye jarrorat hoti hai middleware ki

app.use(express.json());

//how do we create api
const notes = [
    // {
    //     title:"test title1",
    //     description: "test description1"
    // }
]

//post
app.post("/note",(req,res)=>{
    notes.push(req.body);
    res.send("Notes created sucessfully.");
})

//get
app.get("/note",(req,res)=>{
    res.send(notes);
})

//patch
app.patch("/note/:index",(req,res)=>{
    notes[req.params.index].title = req.body.title;
    res.send("Updated sucessfully")
})

//delete
app.delete("/note/:index",(req,res)=>{
    delete notes[req.params.index];
    res.send("notes deleted successfully");
})

//server ko start krna
app.listen(3000,()=>{
    console.log("Server is serving at port 3000.");
});