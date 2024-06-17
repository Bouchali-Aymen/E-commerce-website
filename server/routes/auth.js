const express = require('express');

const User = require('../models/user');

const {json} = require('express');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const authRouter = express.Router();

require("dotenv").config();



authRouter.post('/api/signup',async(req,res)=>{
    try{
        
        const {name,email,password} = req.body;
        const exists = await User.findOne({email});
        if(exists){
            return res.status(400).json({msg:"account with this email already exist"});
        }
        let cart = {};
        for (let index = 0; index < 300+1; index++) {
            cart[index] = 0;
            }

        const hash = await bcrypt.hash(password,10);

        var user = new User({
            name,
            email,
            password:hash,
            cart:cart
        });
        user = await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.status(200).json(token);
    }
    catch(e){
        res.status(500).json({error:e.message});
    }
})

//Login 

authRouter.post('/api/signin',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"a user with this email does not exist"})
        }
        const ismatch = bcrypt.compare(password,user.password);
    
        if(!ismatch){
            return res.status(400).json({msg:"incorrect password"});
        }
    
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        
        res.json({token,...user._doc});
    }
    catch(e){
        res.status(500).json({error:e.message});
    }


})


module.exports = authRouter;