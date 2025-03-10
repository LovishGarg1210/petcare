const express=require("express");
const OrderRouter=express.Router();
const {Payment,fetchOrdersbyemail,Success,fetchAllorders}=require('../Controller/order');
OrderRouter.post('/create-payment-intent',Payment);

OrderRouter.get('/Success',Success);
OrderRouter.get('/Orderhistory',fetchOrdersbyemail);
OrderRouter.get('/allOrderhistory',fetchAllorders);
module.exports=OrderRouter;
