const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/server-config");
const apiRoutes = require("./routes/index");

function setupAnfStartServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api", apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started at port: ${PORT}`);
    });
}

setupAnfStartServer();
