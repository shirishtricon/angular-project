const dbConfig = require('../Config/dbConnection')
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max, 
            min: dbConfig.pool.min, 
            acquire: dbConfig.pool.acquire, 
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate().then(() => {
    console.log('DB Connected successfully')
}).catch((err) => {
    console.log(err);
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.employee = require('./employee')(sequelize, DataTypes);
db.department = require('./department')(sequelize, DataTypes)

db.sequelize.sync({force: false}).then (() => {
    console.log('Yes. re-syc done!');
})

module.exports = db;