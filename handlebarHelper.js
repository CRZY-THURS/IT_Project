const exphbs = require("express-handlebars");

const hbs = exphbs.create({
    defaultlayout: "main",
    extname: "hbs",

    // helper functions
    helpers: {
        equals: function (a, b) {
            return (a == b);
        },

        showDate: function (date) {
            return (
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate()
            );
        },
    },
});

module.exports = hbs;
