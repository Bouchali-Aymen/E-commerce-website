const express = require('express');


const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

const path = require('path');

require("dotenv").config();

const authRouter = require('./routes/auth');
const multer = require('multer');
const uploadRouter = require('./routes/upload');
const productRouter = require('./routes/productRouter');


const DB = "mongodb://Aymen:aymenro321@ac-tto8ehy-shard-00-00.enxfqwt.mongodb.net:27017,ac-tto8ehy-shard-00-01.enxfqwt.mongodb.net:27017,ac-tto8ehy-shard-00-02.enxfqwt.mongodb.net:27017/ecom?ssl=true&replicaSet=atlas-mi1lwm-shard-0&authSource=admin&retryWrites=true&w=majority";








mongoose.connect(DB).then(()=>{
    console.log("connected to DB done!");
}).catch((e)=>{
    console.log(e);
})



app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(uploadRouter);
app.use(productRouter);

app.get('/',(req,res)=>{

    res.send("hello world")
})

//api
app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log(`connected ${process.env.PORT}`);
})


