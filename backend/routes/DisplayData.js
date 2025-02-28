const express = require('express');
const router = express.Router(); // Use 'router' instead of 'app'

router.post("/foodData", (req, res) => {
  try {
    if (!global.usersData) {
      return res.status(500).send({ message: "Data not loaded yet" });
    }

    // console.log(global.usersData);
    // console.log(global.foodCategory);
    res.send([global.usersData, global.foodcategorydata]);

    //res.send(global.categorydata);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
