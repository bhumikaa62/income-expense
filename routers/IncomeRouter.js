const router = require('express').Router();

const { Income } = require('../models');
const ApiResponse = require('./ApiResponse');
const { Op } = require("sequelize");

router.post("/add", async (req, res) => {
    try {
        const { user_id, source_id, amount, month, year } = req.body;

        const data = await Income.create({
            user_id,source_id,amount,month,year,
            date: new Date()
        });

        res.json(new ApiResponse(true, "Income added successfully", data));
    } catch (err) {
         console.log(err);
        res.json(new ApiResponse(false, "Error adding income", err));
    }
});


router.get("/listincome/:months/:user_id", async (req, res) => {
  try {
    const months = parseInt(req.params.months);
    const user_id = parseInt(req.params.user_id);

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const data = await Income.findAll({
      where: {
        user_id: user_id,
        year: currentYear,
        month: {
          [Op.gte]: currentMonth - months + 1
        }
      }
    });

    res.json(new ApiResponse(true, "Income list fetched", data));

  } catch (err) {
    console.log(err);
    res.json(new ApiResponse(false, "Error fetching income list", err.message));
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, month, year } = req.body;

    await Income.update(
      { amount, month, year },
      { where: { id } }
    );

    res.json(new ApiResponse(true, "Income Updated Successfully"));

  } catch (err) {
    res.json(new ApiResponse(false, "Update Failed", err.message));
  }
});
module.exports = router;



