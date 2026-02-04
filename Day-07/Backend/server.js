/**
 * Server ko start krna
 * Database se connect krna
 */

const app = require("./src/app");
const connectToDB = require("./src/config/database");
require("dotenv").config();

connectToDB();

app.listen(3000,()=>{
    console.log("Server is serving at port 3000");
})