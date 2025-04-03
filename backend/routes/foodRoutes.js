const express = require("express");
const router = express.Router();
const FoodItem = require("../models/foodItemModels"); 
const Foo = require("../models/foo"); 

router.post("/add",async (req,res) => {
    try{
        const{
            CategoryName,
            name,
            img,
            options,
            description,
            type
        } = req.body;
        console.log("Received Data:", req.body);
        if(!CategoryName || !name || !img || !options || !description || !type){
            return res.status(400).json({error:"Please fill all the fields"});
        }

        const newFoodItem = new FoodItem({
            CategoryName,
            name,
            img,
            options,
            description,
            type
        });

        //console.log("Generated UUID (_id):", newFoodItem._id);
        await newFoodItem.save();

        res.status(201).json({
            message: "Food item added successfully!",
            foodItem: newFoodItem
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.post("/addFoo",async (req,res) => {
    try{
        const{
            name,
            price,
            category
        } = req.body;
        console.log("Received Data:", req.body);
        if(!name || !price || !category){
            return res.status(400).json({error:"Please fill all the fields"});
        }

        const newFooItem = new Foo({
            name,
            price,
            category
        });

        //console.log("Generated UUID (_id):", newFoodItem._id);
        await newFooItem.save();

        res.status(201).json({
            message: "Food item added successfully!",
            foodItem: newFooItem
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});
module.exports = router;
