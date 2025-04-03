const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
}, { collection: "food_item"}); // Explicit collection 

// export model to mongo to collection name
module.exports = mongoose.model("Foo", FoodItemSchema, "food_item");