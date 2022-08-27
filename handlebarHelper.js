const exphbs = require("express-handlebars");

const hbs = exphbs.create({
    defaultlayout: "main",
    extname: "hbs",

    // helper functions
    helpers: {
        equals: function (a, b) {
            return (a == b);
        },
    },
});

module.exports = hbs;
