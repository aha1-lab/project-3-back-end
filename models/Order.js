const mongoose = require("mongoose");
const { schema } = require("./User");
const orderSchema= new mongoose.Schema({
buyer: {type: mongoose.Schema.Type.ObjectId, ref:"person"}, 
saler: {type: mongoose.Schema.Type.OpjectId, ref:"person"},/*buyer and saler: is the ID of the user who made the purchase and sell.
Its type is ObjectId (a special identifier of MongoDB) and refers to a document within the person group*/
shippingAddres:{type: mongoose.Schema.Type,ObjectId, ref: "address"},

orderStatus: {
    type: String,
    enum: ['processing', 'shipped','delivered', 'cancelled '],
    default: 'processing'
},
paymentStatus: {
    type: String,
    enum: ['pending', 'complated', 'failed'],
    default: 'pending'
},
createdAt: {type: Date, default: Date.now},

}, 
{ timestamps: true});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;