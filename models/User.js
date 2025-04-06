const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        required:[true,"Email is Required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    hashedPassword:{ type:String, required:[true,"Password is Required"] },
    email:{type:String, required: [true, "Email is required"]},
    userType:{type:String, enum:["seller", "buyer"], required: [true, "Use type is required"]},
    active:{ type: Boolean, default: true },
},
{ timestamps: true });



const User = model("User",userSchema)

module.exports = User