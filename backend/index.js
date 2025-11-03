const express = require('express');
const user = require('./routes/user');
const app = express();
user
app.use('/user',user)

app.get('/',(req,res)=>{
    res.send("Show the code")
})



app.listen(3000,()=>{
    console.log("server running");
})