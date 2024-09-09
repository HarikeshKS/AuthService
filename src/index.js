const express = require("express");
const bodyParser = require("body-parser");
const { PORT, DB_SYNC } = require("./config/server-config");
const apiRoutes = require("./routes/index");
// const db = require("./models/index");
// const {User, Role} = require("./models/index");

function setupAnfStartServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api", apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started at port: ${PORT}`);
        // if (DB_SYNC) {
        //     db.sequelize.sync({ alter: true });
        // }

        // const u1 = await User.findByPk(2);
        // const r1 = await Role.findByPk(2);

        // u1.addRole(r1);
    });
}

setupAnfStartServer();
