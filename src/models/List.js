const Sequelize = require('sequelize');
const db = require('../../db.config');

module.exports = db.sequelize.define('list',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        deadline: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        status: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
    },{
        timestamps: false,
    }
);