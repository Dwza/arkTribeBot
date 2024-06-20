const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Tribe = sequelize.define('tribe', {
    name: {
        type: Sequelize.STRING
    },
    tag: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    lat: {
        type: Sequelize.NUMBER
    },
    lon: {
        type: Sequelize.NUMBER
    },
    server_tag: {
        type: Sequelize.STRING
    }
});

module.exports = Tribe;