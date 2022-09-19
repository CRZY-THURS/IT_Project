const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

// this router contains URLs that related to user authentication
authRouter.get(
    "/signup",
    (req, res) => {
        res.render("signup", {});
    }
);

authRouter.post("/signup", authController.signupUser);

authRouter.get(
    "/login",
    (req, res) => {
        res.render("login", {flash: req.flash("error"),});
    }
);

authRouter.post(
    "/login",
    passport.authenticate("user", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        res.redirect("/home"); // login was successful, send user to home page
    }
);

authRouter.post("/logout", (req, res) => {
    req.logout(); // kill the session
    res.redirect("/login");
});

authRouter.get(
    "/changepassword",
    authController.isAuthenticatedUser,
    (req, res) => {
        res.render("changePassword", {});
    }
);

authRouter.post("/changepassword", authController.isAuthenticatedUser, authController.editUserPassword);

authRouter.get(
    "/changename",
    authController.isAuthenticatedUser,
    (req, res) => {
        res.render("changeName", {});
    }
);

authRouter.post("/changename", authController.isAuthenticatedUser, authController.editUserName);

// export the router
module.exports = authRouter;