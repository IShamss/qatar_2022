const express = require("express");
require("./src/db/mongoose");
const app = express();
const port = 5000;

const cors = require("cors");

app.use(express.json());
app.use(cors());

const auth_router = require("./src/routers/auth");
app.use(auth_router);
const admin_router = require("./src/routers/admin");
app.use(admin_router);
const user_router = require("./src/routers/user");
app.use(user_router);
const team_router = require("./src/routers/team");
app.use(team_router);
const stadium_router = require("./src/routers/stadium");
app.use(stadium_router);

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
