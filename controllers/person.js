const User = require('../models/User')
const router = require('express').Router()
const verifyToken = require("../middleware/verify-token")



router.get("/userDetails/:userId", async (req, res)=>{
    try {
        const userDetails = await User.findById(req.params.userId);
        console.log(userDetails)
        res.status(200).json(userDetails)

    } catch (error) {
        res.status(500).json({error:error.message})

    }
})

module.exports = router