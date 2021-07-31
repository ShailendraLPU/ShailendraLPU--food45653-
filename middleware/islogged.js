const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    res.json({ loggedIn: false });
  }
  next();
};

module.exports = {
  isLoggedIn,
};
