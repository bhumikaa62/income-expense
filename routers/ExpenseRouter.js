const router = require('express').Router();
const { Expense } = require('../models');
const ApiResponse = require('./ApiResponse');

router.post("/add", async (req, res) => {
  try {
    const {
      user_id,category_id,amount,mode,month,year
    } = req.body;

    const data = await Expense.create({
      user_id,category_id,amount,mode,month,year,
      expensedate: new Date(),
      entrydate: new Date()
    });

    res.json(new ApiResponse(true, "Expense added successfully", data));
  } catch (err) {
    console.log(err);
    res.json(new ApiResponse(false, "Error adding expense", err));
  }
});

router.post("/list", async (req, res) => {
  try {
    const { user_id, month, year } = req.body;

    const whereCondition = { user_id };

    // agar month diya hai to filter kare
    if (month) {
      whereCondition.month = month;
    }

    // agar year diya hai to filter kare
    if (year) {
      whereCondition.year = year;
    }

    const data = await Expense.findAll({
      where: whereCondition,
      order: [["expensedate", "DESC"]]  // latest pehle aayega
    });

    res.json(new ApiResponse(true, "Expense list fetched successfully", data));

  } catch (err) {
    console.log(err);
    res.json(new ApiResponse(false, "Error fetching expense list", err));
  }
});


router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, amount, mode, month, year } = req.body;

    const data = await Expense.update(
      { category_id, amount, mode, month, year },
      { where: { id } }
    );

    res.json(new ApiResponse(true, "Expense updated successfully", data));
  } catch (err) {
    console.log(err);
    res.json(new ApiResponse(false, "Error updating expense", err));
  }
});

module.exports = router;
