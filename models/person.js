const { default: mongoose } = require('mongoose');
const menogoose = require('mongoose');


const PersonSchema = menogoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    dateOfBirth:{
        type:Date,
        required: true,
    },
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User", unique: true},
    active:{
        type: Boolean,
        default: true,
    },
    cart:[{
        product:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
        quantity:{type:Number, default:1},
    }]
});

const Person=mongoose.model("Person", PersonSchema);

module.exports = Person;