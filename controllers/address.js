const Address = require('../models/address');
const router = require("express").Router();

router.get("/", async(req,res)=>{
    try {
        const index = await Address.find({user: req.user._id});
        res.status(200).json(index);
    } catch (error) {
        res.status(500).json({err:error.message});
    }
});

router.post("/", async (req, res)=>{
    try {
        req.body.user = req.user._id;
        const newAddress = await Address.create(req.body);
        newAddress._doc.user = req.user;
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({err:error.message});
    }
});

router.get("/:itemId", async(req, res)=>{
    try {
        const findAddress = await Address.findById(req.params.itemId);
        if(!findAddress){
            res.status(404);
            throw new Error('Could not find this id');
        }
        res.status(200).json(findAddress);
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
        req.body.user = req.user._id;
        const findAddress = await Address.findByIdAndUpdate(req.params.itemId, req.body,{
            new:true
        });
        if(!findAddress){
            res.status(404);
            throw new Error('Could not find this id');
        }
        findAddress._doc.user = req.user;
        res.status(200).json(findAddress);
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
        req.body.user = req.user._id;
        req.body.active = false;
        const findPerson = await Person.findByIdAndUpdate(req.params.itemId, req.body,{
            new:true
        });
        if(!findPerson){
            res.status(404);
            throw new Error('Could not find this id');
        }
        findPerson._doc.user = req.user;
        res.status(200).json(findPerson);
    } catch (error) {
        if(res.statusCode === 404){
            res.json({err:error.message});
        }else{
            res.status(500).json({err:error.message})
        }
    }
});

module.exports = router;