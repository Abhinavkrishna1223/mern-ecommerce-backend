const express = require("express");
const mongoose = require("mongoose");


const server = express();
const cors = require("cors")
const port = 8080 || process.env.PORT ;

const productRouters = require("./routes/Products");
const categoryRouters = require("./routes/CategoryRoute");
const brandRouters = require("./routes/BrandsRoute");
const authRouters = require("./routes/AuthRouter");
const userRouters = require("./routes/UserRoute");
const cartRouters = require("./routes/CartRouter");


//middlewares
server.use(cors({
  exposedHeaders:['X-Total-Count'] //It is used to expose the headers in cross origin to get total count of Products for pagination //
}));
server.use(express.json()); // --> To parse req.body //
server.use('/products',productRouters.router);
server.use('/categories',categoryRouters.router);
server.use('/brands',brandRouters.router);
server.use('/auth',authRouters.router);
server.use('/users',userRouters.router);
server.use('/cart',cartRouters.router);



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  console.log("Database connected successfully");
}


server.get("/", (req,res)=>{
    res.json({status:"success"})
})


server.listen(port, ()=>{
    console.log("Server 8080 started successfully");
})