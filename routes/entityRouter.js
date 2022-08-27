const express = require("express");
const entityRouter = express.Router();
const entityController = require("../controllers/entityController");
const authController = require("../controllers/authController");

entityRouter.post(
    "/addmusic",
    authController.isAuthenticatedUser,
    entityController.addMusic,
);

entityRouter.get(
    "/addplaylist",
    (req, res) => {
        res.render("createPlaylist", {});
    }
);

entityRouter.get(
    "/addmusic",
    (req, res) => {
        res.render("addMusic", {});
    }
);

entityRouter.post(
    "/addplaylist",
    authController.isAuthenticatedUser,
    entityController.addPlaylist,
);

// export the router
module.exports = entityRouter;