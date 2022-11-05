const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('./mongodb/Config');
const user = require('./mongodb/User');
const productModel = require('./mongodb/product');
const product = require('./mongodb/product');

const app = express();

app.use(express.json());
app.use(cors());


const uploads = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads")
        },
        filename:function(req,file,cd){
            cd(null,file.fieldname+"_"+Date.now()+".jpg");
        }
    })
}).single("image")

async function insertData(data)
{
    const userData = new user(data);
    const result = await userData.save();
}
async function inserProduct(data,picture)
{
    const product = new productModel(data,picture);
    const result = await product.save();
}
function productList()
{
    let list = productModel.find();
    return list;
    
}
function singleProduct(id)
{
    let data = productModel.findOne(id);
    return data;
}

function deleteProduct(id)
{
    let delItem = productModel.deleteOne(id);
    return delItem;
}

app.get('/',(req,resp)=>{
    resp.send("App is working");
});

app.post('/signup',async(req,resp)=>{
    insertData(req.body);
});

app.post('/add-product',uploads,(req,resp)=>{
   var product = new productModel(
    {
        name:req.body.name,
        brand:req.body.brand,
        category:req.body.category,
        price:req.body.price,
        description:req.body.description,
        status:req.body.status,
        stock:req.body.stock,
       image:req.file.filename
    }
   )
   product.save();
});

app.get('/product-list',async(req,resp)=>{
    let result = await productList();
    resp.send(result);
    resp.download('./uploads/'+req.params);
});

app.get("/single-product/:id",async(req,resp)=>{
    
    let result = await singleProduct({_id:req.params.id});
    resp.send(result);
});
app.delete("/delete-prooduct/:id",async(req,resp)=>{
    
    const result = await productModel.deleteOne({_id:req.params.id});
    resp.send(result);
   
});
app.put("/update-product/:id",async(req,resp)=>{
    const result = await product.updateOne(
        {_id:req.params.id},
        {
            $set : req.body
        }
        );
    if(result){
        resp.send("Updated");
    }
    else{
        resp.send("Data not found");
    }
});

app.listen(5000);



























//  const connectDB = async()=>{
//     let mongo = require('mongoose');
//     mongo.connect("mongodb://localhost:27017/e-comm");
//      const productSchema = new mongo.Schema({});

//      const productMoodel1 = mongo.model('product',productSchema);
//      const data = await productMoodel1.find();
     
//      console.log(data);
//  }

