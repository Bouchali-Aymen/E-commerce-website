const express = require("express");


const path = require('path');


const multer = require('multer');

const uploadRouter = express.Router();


require("dotenv").config();

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});
-
uploadRouter.use('/images',express.static('uploads/images'));

//creat upload endpoint
uploadRouter.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})



module.exports = uploadRouter;