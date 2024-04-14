const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     name:{
          type: String,
          required:[true, "this is a must"]
     },
     featured: {
          type: Boolean,
          default: false
     },
     rating: {
          type: Number,
          default:4.5
     },
     createdAt: {
          type: Date,
          default: Date.now()
     },
     price:{
          type: Number,
          required: [true, "price is important if you want to fckin sell!"]
     },
     company: {
          type: String,
          enum: {
               values: ['ikea', 'liddy', 'marcos', 'caressa'],
               message: '{VALUE} : unidentified brand!'
          }
     }
})

module.exports = mongoose.model("Product", productSchema);