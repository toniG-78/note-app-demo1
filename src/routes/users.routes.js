const { Router } = require("express");
const router = Router();

//Controllers
const {
  renderSignUpForm,
  signup,
  renderSignInForm,
  signin,
  logout,
} = require("../controllers/users.controller");

//Render SignUp Form
router.get("/users/signup", renderSignUpForm);

// Post new user SignUp
router.post("/users/signup", signup);

//Render SignIn Form
router.get("/users/signin", renderSignInForm);

// Post user login SingIn
router.post("/users/signin", signin);

// User log out
router.get("/users/logout", logout);

module.exports = router;
