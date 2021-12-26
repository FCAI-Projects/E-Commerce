const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Baerer token
    if (!token) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }
  },
  verifyAdmin: (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Baerer token
    if (!token) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== "admin") {
        return res.status(401).json({
          message: "Access Denied",
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }
  },
};
