const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to teams3's final application." });
});


//all routes go here
// VVVVVVVVVVVVVVV


require("./app/routes.org.routes")(app);
require("./app/routes.request.routes")(app);
require("./app/routes.session.routes")(app);
require("./app/routes.subject.routes")(app);
require("./app/routes.tutorSlots.routes")(app);
require("./app/routes.type.routes")(app);
require("./app/routes.user.routes")(app);
require("./app/routes.userRole.routes")(app);
require("./app/routes.tutorSubject.routes")(app);
require("./app/routes.loginToken.routes")(app);
require("./app/routes.location.routes")(app);
require("./app/routes.userOrgs.routes")(app);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

