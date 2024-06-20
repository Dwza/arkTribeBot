const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Server = sequelize.define('server', {
    name: {
        type: Sequelize.STRING
    },
    tag: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    map_tag: {
        type: Sequelize.STRING,
    }
});

module.exports = Server;