/**
 * Server start krne ke liye
 * Database se connect krne ke liye
 */

require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();


app.listen(3000,()=>{
    console.log("Server is serving on port 3000");
})