const mongoose = require("mongoose");

const orderSchema = mongoose.Shema({
    buyer:{type:mongoose.Schema.Type.ObjectId, ref:"Person"},
    saler:{type:mongoose.Schema.Type.ObjectId, ref:"Person"},
    shippingAddres:{type:mongoose.Schema.Type.ObjectId, ref:"Address"},
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
    createdAt: { type: Date, default: Date.now },

    },
    { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
module.export = Order;