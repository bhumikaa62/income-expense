const router = require("express").Router();
const { ExpenseCategory } = require("../models");
const ApiResponse = require("./ApiResponse");


//  Add Expense Category
router.post("/add", async (req, res) => {
  try {
    const { expense_category_name } = req.body;

    if (!expense_category_name) {
      return res.json(new ApiResponse(false, "Expense category name required"));
    }

    const data = await ExpenseCategory.create({
      expense_category_name
    });

    res.json(new ApiResponse(true, "Expense category added", data));
  } catch (err) {
    console.log(err);
    res.json(new ApiResponse(false, "Error adding expense category", err.message));
  }
});


//  List All Expense Categories
router.get("/list", async (req, res) => {
  try {
    const data = await ExpenseCategory.findAll({
      order: [["expense_category_name", "ASC"]]
    });

    res.json(new ApiResponse(true, "Expense categories fetched", data));
  } catch (err) {
    console.log(err);
    res.json(new ApiResponse(false, "Error fetching expense categories", err.message));
  }
});
router.delete("/expense/:id", auth, isAdmin, async (req, res) => {
  try {
    await Expense.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

module.exports = router;
