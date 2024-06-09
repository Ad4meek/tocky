var express = require("express");
var router = express.Router();

const usersController = require("../controllers/users");

router.post("/register", usersController.createUser);
router.post("/login", usersController.loginUser);

module.exports = router;
