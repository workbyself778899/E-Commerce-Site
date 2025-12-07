const express = require('express');
const app = express();
const cors = require('cors')

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

const order = require('./routes/order')
app.use('/order',order)

const contact = require('./routes/contact')
app.use('/contact',contact)
// Featured routes (Top picks / Here table)
const featured = require('./routes/featured')
app.use('/featured', featured)
    
app.get('/',(req,res)=>{
    res.send("Show the code")
})



try {
    app.listen(process.env.PORT,()=>{
    console.log("server running");
    app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
}));
    app.options("*", cors());
})
} catch (error) {
    console.log(error)
}