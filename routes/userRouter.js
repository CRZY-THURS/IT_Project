const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// add a route to handle the GET request for all patients
userRouter.get(
    "/home",
    authController.isAuthenticatedUser,
    userController.homePage,
);

// export the router
module.exports = userRouter;
