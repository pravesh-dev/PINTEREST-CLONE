var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const upload = require('./multer');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* Login page route */
router.get('/login', (req, res, next)=>{
  res.render('login', {error: req.flash('error')});
});

/* Feed page route */
router.get('/feed', (req, res, next)=>{
  res.render('feed');
});

router.post('/upload', upload.single('file'), (req, res)=>{
  if(!req.file){
    return res.status(400).send('no files were uploaded.');
  }
  res.send('File successfully uploaded!');
  res.render('profile', {})
})

/* User profile route */
router.get("/profile", isLoggedIn, async (req, res, next) => {
  const user = await userModel.findOne({
    username: req.session.passport.user
  });
  console.log(user)
  res.render("profile", {user});
});

/* User register route */
router.post("/register", (req, res) => {
  const { fullName, email, username } = req.body;
  const userData = new userModel({ username, fullName, email });

  userModel.register(userData, req.body.password)
  .then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

/* User login route */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {}
);

/* User login route */
router.get('/logout', (req, res)=>{
  req.logout((err)=>{
    if(err){ return next(err); }
    res.redirect('/');
  })
})

/* middleware to check if user loggedIn or not */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
