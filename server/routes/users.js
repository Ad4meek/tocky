var express = require("express");
var router = express.Router();

const usersController = require("../controllers/users");

router.get("/", usersController.getAllUsers);

router.get("/:id", usersController.getUserById);

router.delete("/:id", usersController.deleteUser);

router.put("/:id", usersController.updateUser);

router.post("/", usersController.createUser);

module.exports = router;
