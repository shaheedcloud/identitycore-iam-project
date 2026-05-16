function requireRole(allowedRoles) {
  return (req, res, next) => {
    const user = req.session.user;

    if (!user) {
      return res.redirect("/login");
    }

    if (!allowedRoles.includes(user.role)) {
      const required = encodeURIComponent(allowedRoles.join(","));
      const current = encodeURIComponent(user.role || "unknown");
      return res.redirect(`/access-denied?required=${required}&current=${current}`);
    }

    return next();
  };
}

module.exports = {
  requireRole
};
