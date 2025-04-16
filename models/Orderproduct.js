// const mongoose = require("mongoose");

// const orderItemSchema = new mongoose.Schema({
//     order:{
//         type:mongoose.Schema.Types.ObjectId, ref:"Order", required: true
//     },

//     product:{
//          type:mongoose.Schema.Types.ObjectId, ref:"Product", required: true
//     },
//     quantity:{
//         type: Number, default: 1, min:1
//     },
//     price:{
//         type: Number, required: true
//     }
// });
// const OrderProduct = mongoose.model("OrderProduct",orderItemSchema);
// module.exports = OrderProduct;

const mongoose = require("mongoose");

const orderProductSchema = mongoose.Schema({
    order:{type:mongoose.Schema.Types.ObjectId, ref:"Order"},
    product:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
    quantity:{type:Number, default:1},
    price: {type:Number, required:true },
});

const OrderProduct = mongoose.model("OrderProduct", orderProductSchema);

module.exports = OrderProduct;