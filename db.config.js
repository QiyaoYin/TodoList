const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize('todolist','yqy_admin','yinqiyao',{
    host: '118.178.143.29',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;