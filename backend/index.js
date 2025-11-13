const express = require('express');
const app = express();


// api call supporting code
app.use(express.json());

require('dotenv').config(); // Setting .env data from here

// Connecting the database.
require("./dbConnection/dbConnect");

// Using api which is inside the user file
const user = require('./routes/user');
app.use('/user',user)

const blog = require('./routes/blog');
app.use('/blog',blog)

const product = require('./routes/product');
app.use('/product',product)


app.get('/',(req,res)=>{
    res.send("Show the code")
})



app.listen(process.env.PORT,()=>{
    console.log("server running");
})