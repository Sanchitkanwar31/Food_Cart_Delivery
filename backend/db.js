const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://admin:admin@cluster0.e1by1.mongodb.net/Food_MERN?retryWrites=true&w=majority&appName=Cluster0';
const FoodItem = require('./models/foodItemModels');
const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB on terminal');

    
    // Fetch data from the "food_item" collection
    const fetched_data = mongoose.connection.db.collection("food_item");
    const data = await fetched_data.find({}).toArray(); // Fetch all food items
    global.usersData = data; // Store the fetched data globally

    

    // Fetch data from the "food_category" collection
    const foodcategory = mongoose.connection.db.collection("food_category");
    const catdata = await foodcategory.find({}).toArray();
    global.foodcategorydata = catdata; // Store the category data globally
    
    // Log the fetched data in the terminal
    console.log("Food Items Data:", data);
    console.log("Food Categories Data:", catdata);

  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = mongoDB;
