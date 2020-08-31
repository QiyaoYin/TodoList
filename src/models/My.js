const Sequelize = require('sequelize');
const db = require('../../db.config');


module.exports = db.sequelize.define('my',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        num: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        cr_time: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },{
        timestamps: false,
    }
);