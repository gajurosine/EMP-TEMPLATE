const { Sequelize } = require("sequelize");
const { debuglog } = require("util");

require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "postgresql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

sequelize
    .authenticate()
    .then(() => {
        console.log(`✔ server started on http://localhost:${process.env.PORT}`);
        debuglog(`✔ server started on http://localhost:${process.env.PORT}`);
    })
    .catch((err) => {
        console.error("❌ server did not start properly");
        debuglog(`❌ server did not start properly`);
        debuglog(err);
    });
