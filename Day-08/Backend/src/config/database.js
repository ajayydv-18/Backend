const mongoose = require("mongoose");

function connectTODB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("database is connected sucessfully.")
    })
}

module.exports = connectTODB;