const Product = require("../models/product");
const router = require("express").Router();


const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", async (req, res) => {
  try {
    const {order} = req.query;
    let index = await Product.find({active: true});

    if (order){
      const sortNumber = Number(order)
      index = index.sort((a,b)=>(a.price - b.price) * sortNumber);
    }
    res.status(200).json(index);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (req.user.mode === "seller") {
      req.body.seller = req.user._id;
      req.body.image = req.file.path;
      const newProduct = await Product.create(req.body);
      newProduct._doc.author = req.user;
      res.status(201).json(newProduct);
    } else {
      res.status(401);
      throw new Error("You are not authorize to do this process");
    }
  } catch (error) {
    if (res.statusCode === 404 || res.statusCode === 401) {
      res.json({ err: error.message });
    } else {
      res.status(500).json({ err: error.message });
    }
  }
});

router.get("/:itemId", async (req, res) => {
  try {
    const findProduct = await Product.findById(req.params.itemId).populate("seller");
    if (!findProduct) {
      res.status(404);
      throw new Error("Could not find this product");
    }
    res.status(200).json(findProduct);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ err: error.message });
    } else {
      res.status(500).json({ err: error.message });
    }
  }
});

router.put("/:itemId", upload.single('file'), async (req, res) => {
  try {

      const findProduct = await Product.findById(req.params.itemId);
      if (!findProduct) {
          res.status(404);
          throw new Error('Could not find this product');
      }
      req.body.seller = req.user._id;
      const updateData = { ...req.body };

      if (req.file) {
          updateData.image = req.file.path;
      } else {
          updateData.image = req.body.image || findProduct.image || "";
      }
      
      const updatedProduct = await Product.findByIdAndUpdate(
          req.params.itemId,
          updateData,
          { new: true }
      );

      updatedProduct._doc.author = req.user;
      res.status(200).json(updatedProduct);
  } catch (error) {
      if (res.statusCode === 404) {
          res.json({ err: error.message });
      } else {
          res.status(500).json({ err: error.message });
      }
  }
});

router.delete("/:itemId", async (req, res) => {
  try {
    const findProduct = await Product.findByIdAndUpdate(req.params.itemId,{active:false});
    if (!findProduct) {
      res.status(404);
      throw new Error("Could not find this id");
    }
    findProduct._doc.author = req.user;
    res.status(200).json(findProduct);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ err: error.message });
    } else {
      res.status(500).json({ err: error.message });
    }
  }
});

module.exports = router;
