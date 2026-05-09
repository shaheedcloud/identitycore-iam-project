function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  return next();
}

function redirectIfLoggedIn(req, res, next) {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  return next();
}

module.exports = {
  requireAuth,
  redirectIfLoggedIn
};
