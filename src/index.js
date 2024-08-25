const express = require("express");
const { PORT } = require("./config/server-config");
const bodyParser = require("body-parser");

function setupAnfStartServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.listen(PORT, async () => {
        console.log(`Server started at port: ${PORT}`);
    });
}

setupAnfStartServer();
