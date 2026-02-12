const router = require("express").Router();
const { Income, Expense } = require("../models");
const { Op, fn, col } = require("sequelize");
const ApiResponse = require("./ApiResponse");

router.get("/summary", async (req, res) => {
  try {
    const { user_id, month, year } = req.query;

    if (!user_id || !month || !year) {
      return res.json(new ApiResponse(false, "user_id, month and year required"));
    }

    const totalIncome = await Income.sum("amount", {
      where: { user_id, month, year }
    });

    const totalExpense = await Expense.sum("amount", {
      where: { user_id, month, year }
    });

    const income = totalIncome || 0;
    const expense = totalExpense || 0;

    res.json(new ApiResponse(true, "Summary fetched", {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    }));

  } catch (err) {
    res.json(new ApiResponse(false, "Error fetching summary", err.message));
  }
});

module.exports = router;
