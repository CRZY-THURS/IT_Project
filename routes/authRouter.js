const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

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

// export the router
module.exports = authRouter;