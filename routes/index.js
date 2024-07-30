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

/* User login route */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  (req, res) => {}
);

/* middleware to check if user loggedIn or not */
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router;
