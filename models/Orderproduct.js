const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.ObjectId, ref:"Order", required: true
    },

    product:{
         type:mongoose.Schema.Types.ObjectId, ref:"Product", required: true
    },
    quantity:{
        type: Number, default: 1, min:1
    },
    price:{
        type: Number, required: true
    }
});
const OrderProduct = mongoose.model("OrderProduct",orderItemSchema);
module.exports = OrderProduct;