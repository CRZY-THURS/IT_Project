const express = require("express");
const entityRouter = express.Router();
const entityController = require("../controllers/entityController");
const authController = require("../controllers/authController");

// this router contains URLs that related to data manipulation
entityRouter.post(
    "/addmusic",
    authController.isAuthenticatedUser,
    entityController.addMusic,
);

entityRouter.get(
    "/addplaylist",
    authController.isAuthenticatedUser,
    (req, res) => {
        res.render("createPlaylist", {});
    }
);

entityRouter.get(
    "/addmusic",
    authController.isAuthenticatedUser,
    (req, res) => {
        res.render("addMusic", {});
    }
);

entityRouter.post(
    "/addplaylist",
    authController.isAuthenticatedUser,
    entityController.addPlaylist,
);

entityRouter.get(
    "/addmusic/:_id",
    authController.isAuthenticatedUser,
    entityController.getMusicForAdding,
);

entityRouter.post(
    "/addmusic/:_id",
    authController.isAuthenticatedUser,
    entityController.addMusicToPlaylist,
);

entityRouter.get(
    "/all-music",
    authController.isAuthenticatedUser,
    entityController.getAllMusic,
);

entityRouter.get(
    "/public-music-library",
    authController.isAuthenticatedUser,
    entityController.browseAllMusic,
);

entityRouter.post(
    "/add-music-to-my-library/:_musicId",
    authController.isAuthenticatedUser,
    entityController.addFromAllMusic,
);


// export the router
module.exports = entityRouter;