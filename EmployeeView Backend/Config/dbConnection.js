// // // const mysql = require('mysql2');
// // const { Sequelize } = require('sequelize');
// const dotenv = require("dotenv");

// dotenv.config();


// // const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
// //   host: 'localhost',
// //   dialect: 'mysql'
// // });

// // async function testdb() {
// //   try {
// //     await sequelize.authenticate();
// //     console.log('Connection has been established successfully.');
// //   } catch (error) {
// //     console.error('Unable to connect to the database:', error);
// //   }
// // }

// // const db = {};

// // db.Sequelize = Sequelize;
// // db.sequelize = sequelize;

// // db.department = require('../models/department');
// // db.employee = require('../models/employee')
// // module.exports = { db, testdb};

// // // D:\Angular Practice\EmployeeView Backend\node_modules\.bin\sequelize-auto
// // // sequelize-auto -o "./models" -d employeeview -h localhost -u root -p 3306 -x shirish35 -e mysql
// // //sequelize-auto -o "./models" -d sequelize_auto_test -h localhost -u my_username -p 5432 -x my_password -e postgres

// module.exports = {
//   HOST: process.env.host,
//   USER: process.env.user,
//   PASSWORD: process.env.password,
//   DB: process.env.database,
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// }
