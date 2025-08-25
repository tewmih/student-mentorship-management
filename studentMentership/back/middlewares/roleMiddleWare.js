const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Unauthorized - No user found" });
      }
      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      if (!allowedRoles.includes(userRole)) {
        return res
          .status(403)
          .json({ message: "Forbidden - Insufficient role" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };
};

export default roleMiddleware;
