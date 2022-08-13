const exphbs = require("express-handlebars");

const hbs = exphbs.create({
    defaultlayout: "main",
    extname: "hbs",

    // helper functions
    helpers: {
        
    },
});

module.exports = hbs;
