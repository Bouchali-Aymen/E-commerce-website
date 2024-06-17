const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator: (value)=>{
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;     
                return value.match(re);       
            },
            message:"email is not valid"
        },
    },
    password:{
        required:true,
        type:String,
    },
    cart:{
        type:Object
    },
    data:{
        type:Date,
        default:Date.now,
    }

})

const User = mongoose.model("User", userSchema);

module.exports = User;