const User = require('../models/User')
const router = require('express').Router()
const verifyToken = require("../middleware/verify-token")




router.get("/", async(req,res)=>{
    try {
        const index = await User.find();
        res.status(200).json(index);
    } catch (error) {
        res.status(500).json({err:error.message});
    }
});

router.post("/", async (req, res)=>{
    try {
        req.body.user = req.user._id;
        const newPerson = await User.create(req.body);
        newPerson._doc.user = req.user;
        res.status(201).json(newPerson);
    } catch (error) {
        res.status(500).json({err:error.message});
    }
});

router.get("/:userId", async(req, res)=>{
    try {
        const findPerson = await User.findById(req.params.userId);
        if(!findPerson){
            res.status(404);
            throw new Error('Could not find this id');
        }
        res.status(200).json(findPerson);
    } catch (error) {
        if(res.statusCode === 404){
            res.json({err:error.message});
        }else{
            res.status(500).json({err:error.message})
        }
    }
});

router.put("/edit/:userId", async(req, res)=>{
    try{
    const foundUser = await User.findById(req.params.userId)

    console.log(foundUser.username)
    console.log(req.body.user._id)

    const updatedUser = await User.findByIdAndUpdate(req.params.userId,req.body,{new:true})
    res.json(updatedUser)
 }
 catch(err){
     res.status(500).json({err:err.message})
 }
});


module.exports = router