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

userRouter.get(
    "/library",
    authController.isAuthenticatedUser,
    userController.library,
);

userRouter.post(
    "/library/search",
    authController.isAuthenticatedUser,
    userController.searchMusic,
);

userRouter.get(
    "/playlist-library",
    authController.isAuthenticatedUser,
    userController.libraryForPlaylist,
);

userRouter.post(
    "/playlist-library/search",
    authController.isAuthenticatedUser,
    userController.searchPlaylist,
);

// export the router
module.exports = userRouter;
