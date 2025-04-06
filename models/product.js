const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    condition: { type: String, enum: ["used", "new"], default: "new" },
    active: { type: Boolean, default: true },
    image: {type:String, required:true},
},
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
