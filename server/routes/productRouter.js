const express = require('express');
const fetchUser = require('../middlewares/cart-auth');

const productRouter = express.Router();


const Product = require('../models/product');
const User = require('../models/user');


productRouter.post('/addProduct',  async(req,res) => {
    let productslength = await Product.find({});
    let id;
    if (productslength.length>0){
        let last_product_array = productslength.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    try{
        const {name,old_price,new_price,category,image} = req.body;

        let product = new Product({
            id:id,
            name,
            old_price,
            new_price,
            category,
            image,
        });
        product = await  product.save();
        if(!product){
            return res.status(400).send("The product was not added");
        }
        res.status(201).json({product});
    }
    catch(e){
        res.status(500).json({error:e.message});
    }
});


//Remove Product


productRouter.post('/removeProduct', async(req,res) =>{
    try{
        const {id} = req.body;
        const result = await Product.findOneAndDelete({id});
        if (result) res.status(200).json({message:'product has been deleted succesfully'});
        else res.status(404).json({message:"the product does not exist"});

    }
    catch(error){
        res.status(500).json({error:error.message});
    }
    
});



//get All Products


productRouter.get('/getProducts', async(req,res)=>{
    try{
        let products=await Product.find({});
        if(products) return res.status(200).json(products);
        else return res.status(404).json('No products found');
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})



//get new collection products

productRouter.get('/getNewCollection', async(req,res)=>{
    try{
        let products = await Product.find({});
        const new_collection = products.slice(-8);
        if(new_collection) return res.status(200).json(new_collection);
        else return res.status(404).json('no products found')
    } 
    catch (error) {
        res.status(500).json({error:error.message});
    }
})


//add to cart
productRouter.post('/addToCart',fetchUser,async(req,res)=>{
    console.log(req.body,req.user);
    try{
        const user = await User.findById(req.user);
        if(!user) return res.status(400).json({msg:'no user is available with this information'})

        user.cart[req.body.itemid] += 1;
        await User.findByIdAndUpdate(req.user,{cart:user.cart});
        res.status(200).json({msg:'product added succesfully !! '});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

//remove  from cart

productRouter.post('/removeFromCart', fetchUser , async (req, res) => {
    // get the current user
    try{
        const user = await User.findById(req.user);
        if(!user) return res.status(400).json({msg:'no user is available with this information'});
        if(user.cart[req.body.itemid]>0){
            user.cart[req.body.itemid] -= 1;
            await User.findByIdAndUpdate(req.user,{cart:user.cart});
            res.status(200).json({msg:'product removed succesfully !! '});
        }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
    
    // check if the product is in the users cart
})


//get cart products 
productRouter.post('/numberOfProductsInCart',fetchUser,async(req,res)=>{
    try{
        const user = await User.findById(req.user);
        if(!user) return res.status(400).json({msg:'no user is available with this information'});
        let sum = 0;
        for(const item in user.cart){
            if(user.cart[item]>0){
                sum = sum + user.cart[item];
            }
        }
        res.status(200).json(sum)
        }
        
    
    catch(error){
        res.status(500).json({error:error.message});
    }
});

productRouter.post('/getCartData', fetchUser,async(req,res)=>{
    try{
        const user = await User.findById(req.user);
        if(!user) return res.status(400).json({msg:'no user is available with this information'});
        res.status(200).json(user.cart);
        
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})


module.exports = productRouter;
