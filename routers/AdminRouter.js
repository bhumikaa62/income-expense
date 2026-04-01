const router = require("express").Router();
const db = require("../models"); // sequelize
const isAdmin = require("../middleware/isAdmin");

const { User, Income, Expense } = db;


// ✅ 1. All Users
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "mobile"]
    });

    res.json({ success: true, data: users });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


// ✅ 2. All Income (with user)
router.get("/incomes", isAdmin, async (req, res) => {
  try {
    const incomes = await Income.findAll({
      include: {
        model: User,
        attributes: ["name", "email"]
      }
    });

    res.json({ success: true, data: incomes });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


// ✅ 3. All Expenses (with user)
router.get("/expenses", isAdmin, async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: {
        model: User,
        attributes: ["name", "email"]
      }
    });

    res.json({ success: true, data: expenses });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


// ✅ 4. User wise summary (BEST FEATURE)
router.get("/summary", isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Income,
          attributes: ["amount"]
        },
        {
          model: Expense,
          attributes: ["amount"]
        }
      ]
    });

    const result = users.map(user => {
      const totalIncome = user.Incomes.reduce((sum, i) => sum + i.amount, 0);
      const totalExpense = user.Expenses.reduce((sum, e) => sum + e.amount, 0);

      return {
        name: user.name,
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
      };
    });

    res.json({ success: true, data: result });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;