require('dotenv').config();
require("express-async-errors")


const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const router = require('./routes/products')


const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.json());

app.get("/", (req,res)=>{
     res.status(200).send(`<h1>Home</h1><a href="/api/v1/products">Products Goes Here!!!</a>`);
})

//routes
app.use("/api/v1/products", router);


app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port = process.env.PORT || 3000;
const start = async () =>{
     try {
          //db cnct
          await connectDB(process.env.MONGODB_URI)
          app.listen(port, ()=>{
               console.log(`listening to port : ${port}`);
          })
     } catch (error) {
          console.log(error);
     }
}
start();