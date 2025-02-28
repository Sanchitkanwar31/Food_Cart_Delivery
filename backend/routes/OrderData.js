// const express = require("express");
// const router = express.Router();

// const Order = require('../models/Order');

// router.post("/orderData", async(req, res)=>{ 
//     let data = req.body.order_data;
//     await data.slice(0,0,{Order_date: req.body.order_data})

//     let eId = await Order.findOne({'email': req.body.email})
    
//     console.log(eId)
//     //if() will tell that the user is new...
//     if(eId === null){
//         try{
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(() =>{
//                 res.json({success:true})
//                 console.log("Response",res)
//             })
//         }
//         catch(error){
//             console.log(error)
//             res.send("Server Error",error.message)
//         }
//     }
//     else{
//         try{
//             await Order.findOneAndUpdate({ email: req.body.email},
//                 {$push: {order_data: data}} 
//                 //it will append the data bcoz of $push  in my Orderlist ,it will not replace earlier ones..
//             ).then(() => {
//                 res.json({success:true})
//             })
//         }catch(error){
//             res.send("Server Error",error.message)
//         }

//     }
// })

// module.exports = router;


const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/orderData", async (req, res) => { 
    try {
        console.log("Received Order Data:", req.body);

        let { email, order_data, order_date } = req.body;

        // Validate request body
        if (!email || !order_data || !order_date || !Array.isArray(order_data) || order_data.length === 0) {
            console.error("❌ Missing or invalid email/order_data/order_date");
            return res.status(400).json({ success: false, message: "Missing or invalid email, order_data, or order_date" });
        }

        //  Check if user already has an order
        let existingOrder = await Order.findOne({ email });

        if (existingOrder) {
            //  Append new order to existing document
            await Order.findOneAndUpdate(
                { email },
                { $push: { orders: { items: order_data, order_date } } } //it will append the data bcoz of $push  in my Orderlist ,it will not replace earlier ones..
            );
            console.log(" Order successfully updated.");
        } else {
            // Create a new order document if no previous order exists
            await Order.create({
                email,
                order_date, 
                orders: [{ items: order_data }]
            });
            console.log(" New order created successfully.");
        }

        return res.json({ success: true });

    } catch (error) {
        console.error("Error processing order:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
