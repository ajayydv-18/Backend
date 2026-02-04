const express = require("express");

//server ko create krte hai
const app = express();

//lets program the server
app.get("/",(req,res)=>{
    res.send("This is Home Page");
})

app.get("/about",(req,res)=>{
    res.send("This is about page");
})
  
app.get("/contact",(req,res)=>{
    res.send("this is contact page");
})


//server ko start krte hai
app.listen(3000,()=>{
    console.log("The server is serving at port number 3000");
})