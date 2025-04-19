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

router.put("/edit/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const {
        CategoryName,
        name,
        img,
        options,
        description,
        type
      } = req.body;
      console.log("Received Data:", req.body);
      if (!CategoryName || !name || !img || !options || !description || !type) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }
  
      const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, {
        CategoryName,
        name,
        img,
        options,
        description,
        type
      }, { new: true });
  
      if (!updatedFoodItem) {
        return res.status(404).json({ error: "Food item not found" });
      }
  
      res.status(200).json({
        message: "Food item updated successfully!",
        foodItem: updatedFoodItem
      });
    } catch (error) {
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


router.delete("/deleteFood", async (req, res) => {
    try {
      const { id } = req.query;
      console.log("Received ID:", id);
      if (!id) {
        return res.status(400).json({ error: "Please provide an ID" });
      }
      const deletedItem = await FoodItem.findByIdAndDelete(id);
      res.status(200).json({
        message: "Food item deleted successfully!",
        deletedItem,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });

  router.delete("/deleteCategory", async (req, res) => {
    try {
      const { id } = req.query;
      console.log("Received ID:", id);
      if (!id) {
        return res.status(400).json({ error: "Please provide an ID" });
      }
      const cat = await Foo.findById(id);
        if (!cat) {
            return res.status(404).json({ error: "Category not found" });
        }
    const categoryName = cat.name;
      const deleted = await FoodItem.deleteMany({ CategoryName: categoryName });;
      const deletedItem = await Foo.findByIdAndDelete(id);
      res.status(200).json({
        message: "Category deleted successfully!",
        deletedItem,deleted
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });
  
module.exports = router;
