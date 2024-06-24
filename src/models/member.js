const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Member = sequelize.define('member', {
    user_id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    tribe_tag: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tribe_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    }
});

module.exports = Member;