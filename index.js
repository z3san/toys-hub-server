const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const port = process.env.PORT || 5000;


//Middleware
app.use(cors())
app.use(express.json())


app.listen(port, ()=>{
    console.log(`ToysHub server is running on port ${port}`);
})