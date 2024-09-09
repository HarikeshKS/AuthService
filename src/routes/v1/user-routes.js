const express = require("express");
const router = express.Router();

const UserController = require("../../controllers/user-controller");
const { AuthValidators } = require("../../middlewares/index");

router.post("/signup", AuthValidators.userValidators, UserController.create);
router.post("/signin", AuthValidators.userValidators, UserController.signIn);
router.get("/isAuthenticated", UserController.isAuthenticated);
router.get("/isAdmin", AuthValidators.validateIsAdminRequest, UserController.isAdmin);

module.exports = router;
