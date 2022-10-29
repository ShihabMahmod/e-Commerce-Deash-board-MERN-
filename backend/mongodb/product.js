
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name:String,
        brand:String,
        category:String,
        price:Number,
        description:String,
        status:Boolean,
        stock:Number,
        image:String
    }
);
module.exports=mongoose.model('product',productSchema);