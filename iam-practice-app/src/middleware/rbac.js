function requireRole(allowedRoles) {
  return (req, res, next) => {
    const user = req.session.user;

    if (!user) {
      return res.redirect("/login");
    }

    if (!allowedRoles.includes(user.role)) {
      return res.redirect("/access-denied");
    }

    return next();
  };
}

module.exports = {
  requireRole
};
