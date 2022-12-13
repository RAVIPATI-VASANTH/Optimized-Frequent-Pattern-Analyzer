const checkSessionController = (req, res) => {
  console.log("called");
  if (req.session.userId) return true;
  else return false;
};
module.exports = checkSessionController;
