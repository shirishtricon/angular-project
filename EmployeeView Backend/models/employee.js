// const sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Employee =  sequelize.define('employee', {
    emp_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "emp_id"
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    experience: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    skills: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    dept_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'department',
        key: 'dept_id'
      }
    },
    uuid: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'employee',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uuid" },
        ]
      },
      {
        name: "emp_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emp_id" },
        ]
      },
      {
        name: "dept_id",
        using: "BTREE",
        fields: [
          { name: "dept_id" },
        ]
      },
    ]
  });  

  return Employee;
};
