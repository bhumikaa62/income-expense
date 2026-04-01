module.exports = (req, res, next) => {
  try {
    const user = req.user;

    if (!user || user.role !== "admin") {
      return res.json({
        success: false,
        message: "Access Denied (Admin Only)"
      });
    }

    next();
  } catch (err) {
    res.json({
      success: false,
      message: "Server Error"
    });
  }
};