const app = require("./src/app");
require("dotenv").config();
const connectTODB = require("./src/config/database");

connectTODB();

app.listen(3000,()=>{
    console.log("The server is serving at 3000");
})