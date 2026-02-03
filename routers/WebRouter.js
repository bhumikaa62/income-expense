const router = require('express').Router();
const { User } = require('../models/index');
const ApiResponse = require('./ApiResponse')

const { generateToken } = require('../config/JWTConfig');

router.post("/register", async (req, res) => {
    try {
        const obj = req.body;
        obj.status = true;

        await User.create(obj);
        res.json(new ApiResponse(true, "Registration Done."));
    }
    catch (err) {
        res.json(new ApiResponse(false, "Registration Failed", err))
    }
});


router.post("/login", async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({
        where: { email, password }
    });
    if (user) {
        const token = generateToken(user.email);
        res.json(new ApiResponse(true, "Login Success", token));
    } 
     if (!user.isActive) {
      return res.json(new ApiResponse(false, "User is deactivated"));
    }
    else
        res.json(new ApiResponse(false, "Login Failed."));
        
  
});

module.exports = router;