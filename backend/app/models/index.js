const { Sequelize } = require('sequelize');
const sequelize = require('../config/dbConnection');

async function db() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = db;