const express = require("express");
const router = express.Router();

const userApiRoutes = require("./user-routes");

router.use("/user", userApiRoutes);

module.exports = router;
