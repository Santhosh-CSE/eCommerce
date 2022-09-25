const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

app.use(bodyParser.json());

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

const addToCartRoutes = require('./routes/addToCart');
app.use('/addtoCart', addToCartRoutes);

const updateCartRoutes = require('./routes/updatecart');
app.use('/updatecart', updateCartRoutes);


const deletedCartRoutes = require('./routes/deletecart');
app.use('/deletecart', deletedCartRoutes);

const checkOutRoutes = require('./routes/checkout');
app.use('/checkout', checkOutRoutes);


//Routes
app.get('/',(req,res)=>{
    res.send('We are on home');
});

//Connecting with DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true}, () => 
    console.log('Connected to DB')
);

//This will be listening the Server
app.listen(3000);