require("dotenv").config();
const express = require("express");
const app = express();
const mongoose=require("mongoose");
require("./db/conn");


//const users=require("./userSchema");
const port = process.env.PORT||8005;
const cors=require("cors");
const router=require("./router");
app.use(express.json());
app.use(cors());
app.use(router);
app.listen(port,()=>{
    console.log(`server is running on port number ${port}`)
});