const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// this router contains URLs that related to page views
userRouter.get(
    "/home",
    authController.isAuthenticatedUser,
    userController.homePage,
);

userRouter.get(
    "/home/:_id",
    authController.isAuthenticatedUser,
    userController.myPlaylist,
);

userRouter.get(
    "/profile",
    authController.isAuthenticatedUser,
    userController.getProfile,
);

// export the router
module.exports = userRouter;
