require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const productsJSON = require("./products");

const start = async () =>{
     try {
          await connectDB(process.env.MONGODB_URI);
          await Product.deleteMany();
          await Product.create(productsJSON);
          console.log("population success!");
          process.exit(0);
     } catch (error) {
          console.log(error);
          process.exit(1);
     }
}
start();