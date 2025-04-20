// const mongoose = require("mongoose");
// const { schema } = require("./User");

// const orderItemSchema = new mongoose.Schema({
// product: {
//     type: mongoose.Schema.Types.ObjectId,ref: "Product",
//      required: true
// },
//  quantity: {
//     type: Number, required: true,min: 1
//  },
//  price: {
//     type: Number,required: true
//  },

// });

// const orderSchema= new mongoose.Schema({
// buyer: {type: mongoose.Schema.Types.ObjectId, ref:"Person", required: true}, 

// saler: {type: mongoose.Schema.Types.ObjectId, ref:"Person", required: true},
// /*buyer and saler: is the ID of the user who made the purchase and sell.
// Its type is ObjectId (a special identifier of MongoDB) and refers to a document within the person group*/
// shippingAddress:{type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true},

// items: [orderItemSchema],

// totalAmount:{
// type: Number,
// required: true
// },

// orderStatus: {
//     type: String,
//     enum: ['processing', 'shipped','delivered', 'cancelled'],
//     default: 'processing'
// },
// paymentStatus: {
//     type: String,
//     enum: ['pending', 'completed', 'failed'],
//     default: 'pending'
// },
// paymentMethod:{
//     type: String,
//     enum: ['credit_card', 'paypal', 'cash_on_delivery'],
//     default: 'cash_on_delivery'
// },
// transactionId: {
//     type: String
// },
// createdAt: {
//     type: Date,
//     default: Date.now
// }
// },{
//     timestamps: true
// });

// const Order = mongoose.model("Order", orderSchema);
// module.exports = Order;

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    buyer:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    shippingAddres:{type:mongoose.Schema.Types.ObjectId, ref:"Address"},
    orderSatus:{
        type:String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'], 
        default: 'processing'
    },
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'], 
        default: 'pending'
    },
    orderPrice:{
        type:Number,
        required: true,
    }
    },
    { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;