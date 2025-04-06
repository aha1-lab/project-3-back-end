const mongoose = require("mongoose");

const orderProductSchema = mongoose.Schema({
    order:{type:mongoose.Schema.Type.ObjectId, ref:"Order"},
    product:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
    quantity:{type:Number, default:1},
    price: {type:Number, required:true },
});

const OrderProduct = mongoose.model("OrderProduct", orderProductSchema);

module.export = OrderProduct;