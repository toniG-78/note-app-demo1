const { Router } = require("express");
const router = Router();

// Controllers
const { renderIndex, renderAbout } = require("../controllers/index.controller");

// HOME page ******************
router.get("/", renderIndex);

// ABOUT page **********************
router.get("/about", renderAbout);

module.exports = router;
