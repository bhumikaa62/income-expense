const router = require("express").Router();
const auth = require("../middleware/auth"); // 🔥 ADD THIS
const db = require("../models"); // sequelize
const isAdmin = require("../middleware/isAdmin");

const { User, Income, Expense } = db;


// ✅ 1. All Users

 router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "mobile", "role", "isActive"]
    });

    res.json({ success: true, data: users });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


// ✅ 2. All Income (with user)
router.get("/incomes", auth, isAdmin, async (req, res) => {
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
router.get("/expenses", auth, isAdmin, async (req, res) => {
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
router.get("/summary", auth, isAdmin, async (req, res) => {
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

// ✅ 5. Dashboard Stats (NEW API)
router.get("/stats", auth,isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalIncome = await Income.sum("amount") || 0;
    const totalExpense = await Expense.sum("amount") || 0;

    res.json({
      success: true,
      data: {
        users: totalUsers,
        income: totalIncome,
        expense: totalExpense
      }
    });

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
});

router.delete("/user/:id", auth, isAdmin, async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
