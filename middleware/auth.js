const { verifyToken } = require("../config/JWTConfig");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.json({
        success: false,
        message: "No token provided"
      });
    }

    verifyToken(token, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Invalid token"
        });
      }

      req.user = decoded; // 🔥 yaha user set hoga
      next();
    });

  } catch (err) {
    res.json({
      success: false,
      message: "Server error"
    });
  }
};
