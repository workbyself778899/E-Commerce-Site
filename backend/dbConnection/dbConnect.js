const mongoose = require('mongoose')
require('dotenv').config();

const connecting = async()=>{
try {
    const dbSystem =await mongoose.connect(process.env.MONGO_URL,{dbName:"eShop"});
    console.log(`MongoDb connected and uses Database: ${dbSystem.connection.name} `)
} catch (error) {
    console.log("MongoDb Connection Error Occure: ",error);
    // exit whole process if connection failed 
    // This means “Hey, this error is serious — stop everything and shut down right now.”
    process.exit(1);
}
}

connecting();
module.exports=connecting;