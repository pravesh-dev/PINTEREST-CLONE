var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require("passport");
const upload = require("./multer");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* Login page route */
router.get("/login", (req, res, next) => {
  res.render("login", { error: req.flash("error") });
});

/* Feed page route */
router.get("/feed", (req, res, next) => {
  res.render("feed");
});

router.post("/upload", isLoggedIn, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("no files were uploaded.");
  }
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  const post = await postModel.create({
    postText: req.body.fileCaption,
    image: req.file.filename,
    user: user._id,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

/* route for upload user profile image */
router.post(
  "/profile-image-upload",
  isLoggedIn,
  upload.single("prof_img"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("no files were uploaded.");
    }
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    user.profileImage = req.file.filename;
    await user.save();
    res.redirect("/profile");
  }
);

/* User profile route */
router.get("/profile", isLoggedIn, async (req, res, next) => {
  const user = await userModel
    .findOne({
      username: req.session.passport.user,
    })
    .populate("posts");
  res.render("profile", { user });
});

/* Create pin route */
router.get("/create-pin", (req, res) => {
  res.render("createPin");
});
router.get('/delete-pin/:postId', async (req, res)=>{
  const findPost = await postModel.findOne({_id: req.params.postId}).populate('user');
  const user = await userModel.findOne({_id: findPost.user._id});
  let postIndex = user.posts.indexOf(req.params.postId);
  user.posts.splice(postIndex, 1);
  let deletedPost = await postModel.findOneAndDelete({_id: req.params.postId});
  await user.save();
  res.redirect('/profile');
})
/* User register route */
router.post("/register", (req, res) => {
  const userData = new userModel({
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
  });

  userModel.register(userData, req.body.password).then(function () {
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

/* User logout route */
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
});


/* middleware to check if user loggedIn or not */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
