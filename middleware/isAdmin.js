module.exports = (req, res, next) => {
  console.log("USER 👉", req.user); // 🔥 debug

  if (!req.user || req.user.role !== "admin") {
    return res.json({
      success: false,
      message: "Access Denied (Admin Only)"
    });
  }

  next();
};