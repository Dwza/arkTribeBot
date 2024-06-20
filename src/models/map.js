const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Map = sequelize.define('map', {
    name: {
        type: Sequelize.STRING
    },
    tag: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
});

module.exports = Map;