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

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
