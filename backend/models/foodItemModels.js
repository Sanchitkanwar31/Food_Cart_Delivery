const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true
    },
    options: [
        {
            half: {
                type: Number
            },
            full: {
                type: Number,
                required: true
            }
            
        }
    ],
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);
