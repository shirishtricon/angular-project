var DataTypes = require("sequelize").DataTypes;
var _department = require("./department");
var _employee = require("./employee");
var _hr = require("./hr");
var _manager = require("./manager");

function initModels(sequelize) {
  var Department = _department(sequelize, DataTypes);
  var Employee = _employee(sequelize, DataTypes);
  var Hr = _hr(sequelize, DataTypes);
  var Manager = _manager(sequelize, DataTypes);

  employee.belongsTo(department, { as: "dept", foreignKey: "dept_id"});
  department.hasMany(employee, { as: "employees", foreignKey: "dept_id"});

  return {
    Department,
    Employee,
    Hr,
    Manager,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
