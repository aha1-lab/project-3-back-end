const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
    home:{
        type:String,
        required:true
    },
    road:{
        type:String,
        required: true,
    },
    block:{
        type:String,
        required: true,
    },
    mobilePhone:{
        type:Number,
        required: true,
    },
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;