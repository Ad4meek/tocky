var express = require("express");
var router = express.Router();

const usersController = require("../controllers/users");

router.post("/users", usersController.createUser);

module.exports = router;
