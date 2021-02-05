require("dotenv").config();
const express = require("express")
const bodyParser = require("body-parser")
const db = require("./app/models")

app = express();
db.sequelize.sync({ force: false });

// pars
app.use(bodyParser.json({ limit: "50mb", extended: true }));
// parse requests of content-type - application/x-www-form-urlencoded (Not necessary here I think)
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use( express.static( "public" ) );

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the MangaReader API" });
});

require("./app/routes/index.js")(app)

const PORT = process.env.PORT || 2020;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});