const authenticationMiddleware = (req, res, next) => {
  console.log("called");
  if (req.session.userId) next();
  else res.json({ message: false });
};

module.exports = authenticationMiddleware;
