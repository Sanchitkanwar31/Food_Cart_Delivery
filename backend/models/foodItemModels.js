const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
    CategoryName: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    options: [
        {
            half: { type: Number }, 
            full: { type: Number, required: true } 
        }
    ],
    description: { type: String, required: true },
    type: { type: String, enum: ["Veg", "Non-Veg"], required: true }
}, { collection: "food_category"}); // Explicit collection 

// export model to mongo to collection name
module.exports = mongoose.model("FoodItem", FoodItemSchema, "food_category");