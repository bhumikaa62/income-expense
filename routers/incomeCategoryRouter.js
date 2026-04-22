const router = require("express").Router();
const { IncomeCategory } = require("../models");
const ApiResponse = require("./ApiResponse");


//  Add Income Category
router.post("/add", async (req, res) => {
  try {
    const { income_source_name } = req.body;

    if (!income_source_name) {
      return res.json(new ApiResponse(false, "Income source name required"));
    }

    const data = await IncomeCategory.create({
      income_source_name
    });

    res.json(new ApiResponse(true, "Income category added", data));
  } catch (err) {
    console.log(err);
    res.json(new ApiResponse(false, "Error adding income category", err.message));
  }
});


// List All Income Categories
router.get("/list", async (req, res) => {
  try {
    const data = await IncomeCategory.findAll({
      order: [["income_source_name", "ASC"]]
    });

    res.json(new ApiResponse(true, "Income categories fetched", data));
  } catch (err) {
    console.log(err);
    res.json(new ApiResponse(false, "Error fetching income categories", err.message));
  }
});

router.delete("/income/:id", auth, isAdmin, async (req, res) => {
  try {
    await Income.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});


module.exports = router;
