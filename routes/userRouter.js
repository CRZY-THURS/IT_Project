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

userRouter.get(
    "/library",
    authController.isAuthenticatedUser,
    userController.viewAllMusics,
);

userRouter.get(
    "/myplaylists",
    authController.isAuthenticatedUser,
    userController.viewMyPlaylists,
);

// export the router
module.exports = userRouter;
