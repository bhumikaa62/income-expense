const router = require('express').Router();
const { User } = require('../models/index');
const ApiResponse = require('./ApiResponse')

const { generateToken } = require('../config/JWTConfig');

router.post("/registration", async (req, res) => {
  try {
    const { name,mobile, email, password } = req.body;

    if (!name ||!mobile|| !email || !password) {
      return res.json(
        new ApiResponse(false, "All fields are requierd")
      )
    };
    
      const existingMobile = await User.findOne({ where: { mobile } });
    if (existingMobile) {
      return res.json(new ApiResponse(false, "Mobile already registered"));
    }

    const userExsit = await User.findOne({ where: { email } })
    if (userExsit) {
      return res.json(
        new ApiResponse(false, "Email already registered")
      )
    }
    await User.create({ name,mobile, email, password, isActive: true });
    res.json(
      new ApiResponse(true, "Registration Done")
    )
  }
  catch (err) {
    res.json(
      new ApiResponse(false, "Registration Failed", err.message)
    )
  }
})


router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json(
        new ApiResponse(false, "Email and Password are required")
      )
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json(
        new ApiResponse(false, "Invalid Email and Password")
      )
    }

    //if (!User.isActive) {
     // return res.json(
      //  new ApiResponse(false, "User is Deactivted"))}

    if (user.password !== password) {
      return res.json(
        new ApiResponse(false, "Invalid Email and Password")
      )
    }

    const token = generateToken(user.email)
    return res.json(
      new ApiResponse(true, "Login Success", token)
    )
  }
  catch (err) {
    res.json(new ApiResponse(false, "Login Failed", err.message))
  }
})


router.put("/change-password", async (req, res) => {
  try {
    const { user_id, oldPassword, newPassword } = req.body;

    if (!user_id || !oldPassword || !newPassword) {
      return res.json(new ApiResponse(false, "All fields required"));
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.json(new ApiResponse(false, "User not found"));
    }

    if (user.password !== oldPassword) {
      return res.json(new ApiResponse(false, "Old password incorrect"));
    }

    await User.update(
      { password: newPassword },
      { where: { id: user_id } }
    );

    res.json(new ApiResponse(true, "Password changed successfully"));

  } catch (err) {
    res.json(new ApiResponse(false, "Error changing password", err.message));
  }
});

module.exports = router;