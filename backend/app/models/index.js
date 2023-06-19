const dbConfig = require("../config/db.config.js");

const { Sequelize } = require('sequelize');
const sequelize = require('./config/db.config');

async function db() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = db;