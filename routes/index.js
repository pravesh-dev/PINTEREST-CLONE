var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* User register route */
router.post("/register", (req, res) => {
  const { fullName, email, userName } = req.body;
  const createdUser = userModel.crreate({
    fullName,
    email,
    userName,
  });

  userModel.register(createdUser, req.body.password).then(() => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

module.exports = router;
