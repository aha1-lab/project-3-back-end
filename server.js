const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const testJwtRouter = require("./controllers/test-jwt")
const authRoutes = require("./controllers/auth")
const verifyToken = require("./middleware/verify-token")
const personController = require("./controllers/persons");
const productsController = require("./controllers/product");
const cartController = require("./controllers/cart");
const addressController = require("./controllers/address");


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use('/uploads',express.static('uploads'));
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes go here
app.use("/auth",authRoutes)

app.use("/test-jwt",verifyToken,testJwtRouter);
app.use("/persons",verifyToken, personController);
app.use("/cart",verifyToken, cartController);
app.use("/products",verifyToken, productsController);
app.use("/address",verifyToken, addressController);

// app.post('/upload', upload.single('file'), (req, res)=>{
//   console.log(req.file);
// });


app.listen(3000, () => {
  console.log('The express app is ready!');
});
