const User = require('../models/User');
const router = require("express").Router();


router.get("/", async (req, res) => {
    try {
        const findPerson = await User.findById(req.user._id).populate('cart.product');
        if (!findPerson) {
            return res.status(404).json({ err: 'Could not find this user' });
        }
        res.status(200).json(findPerson);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
});

router.post("/", async(req, res)=>{
    try {
        const findPerson = await User.findById(req.user._id);
        if(!findPerson){
            res.status(404);
            throw new Error('Could not find this user');
        }

        const existingProduct = findPerson.cart.find((item) => {
            return item.product == req.body.product;
        });
        if (existingProduct) {
            return res.status(400).json({ err: 'Product already exists in the cart' });
        }

        findPerson.cart.push(req.body);
        await findPerson.save();
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


router.put("/:cartProductId", async(req, res)=>{
    try {
        const findPerson = await User.findById(req.user._id);
        if(!findPerson){
            res.status(404);
            throw new Error('Could not find this id');
        }
        const product = findPerson.cart.id(req.params.cartProductId);
        product.quantity = req.body.quantity;
        await findPerson.save();
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

router.delete("/:cartProductId", async(req, res)=>{
    try {
        const findPerson = await User.findById(req.user._id);
        if(!findPerson){
            res.status(404);
            throw new Error('Could not find this id');
        }
        findPerson.cart.remove({_id:req.params.cartProductId});
        await findPerson.save();
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