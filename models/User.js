const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        required:[true,"Email is Required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    mode:{
        type:String,
        required: true,
        enum:['buyer', 'seller']
    },
    hashedPassword:{
        type:String,
        required:[true,"Password is Required"]
    }
  
})



const User = model("User",userSchema)

module.exports = User