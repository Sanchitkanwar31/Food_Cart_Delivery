
// const mongoose = require('mongoose');
// const {Schema} = mongoose;

// const OrderSchema = new Schema({
//     email:{
//         type: String,
//         required: true,
//         unique: true
//     },

//     order_data:{
//         type: Array,
//         required: true,
//     },

// })

// module.exports = mongoose.model("order", OrderSchema)


const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_date: { 
        type: String, 
        required: true 
    }, 
    orders: [
        {
            items: { type: Array, required: true },  
            order_date: { 
                type: String, 
                required: true 
            }
        }
    ]
});

module.exports = mongoose.model("order", OrderSchema);

