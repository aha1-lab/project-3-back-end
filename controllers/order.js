const Order = require('../models/order');
const orderProduct = require('../models/orderProduct');
const router = require("express").Router();

router.get("/", async(req,res)=>{
    try {
        const index = await Order.find();
        res.status(200).json(index);
    } catch (error) {
        res.status(500).json({err:error.message});
    }
});

router.post("/", async (req, res)=>{
    try {
        req.body.author = req.user._id;
        const newOrder = await Order.create(req.body);
        // Need to loop through the product and add them into the orderProduct table
        newOrder._doc.author = req.user;
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({err:error.message});
    }
});

router.get("/:itemId", async(req, res)=>{
    try {
        const findOrder = await Order.findById(req.params.itemId).populate([
            "buyer",
            "saler"
        ]);
        const 
        if(!findOrder){
            res.status(404);
            throw new Error('Could not find this Order');
        }
        res.status(200).json(findOrder);
    } catch (error) {
        if(res.statusCode === 404){
            res.json({err:error.message});
        }else{
            res.status(500).json({err:error.message})
        }
    }
});

router.put("/:itemId", async(req, res)=>{
    try {
        req.body.author = req.user._id;
        const findOrder = await Order.findByIdAndUpdate(req.params.itemId, req.body,{
            new:true
        });
        if(!findOrder){
            res.status(404);
            throw new Error('Could not find this Order');
        }
        newPerson._doc.author = req.user;
        res.status(200).json(findOrder);
    } catch (error) {
        if(res.statusCode === 404){
            res.json({err:error.message});
        }else{
            res.status(500).json({err:error.message})
        }
    }
});

router.delete("/:itemId", async(req, res)=>{
    try {
        req.body.author = req.user._id;
        req.body.active = false;
        const findOrder = await Order.findByIdAndUpdate(req.params.itemId, req.body,{
            new:true
        });
        if(!findProduct){
            res.status(404);
            throw new Error('Could not find this id');
        }
        findProduct._doc.author = req.user;
        res.status(200).json(findProduct);
    } catch (error) {
        if(res.statusCode === 404){
            res.json({err:error.message});
        }else{
            res.status(500).json({err:error.message})
        }
    }
});

module.exports = router;