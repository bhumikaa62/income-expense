const { verifyToken } = require("../config/JWTConfig");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("HEADER 👉", authHeader); // 🔥 debug

    if (!authHeader) {
      return res.json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    verifyToken(token, (err, decoded) => {
      console.log("DECODED 👉", decoded); // 🔥 debug

      if (err) {
        return res.json({
          success: false,
          message: "Invalid token"
        });
      }

      req.user = decoded;
      next();
    });

  } catch (err) {
    res.json({
      success: false,
      message: "Server error"
    });
  }
};