// const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Deaprtment =  sequelize.define('department', {
    dept_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dept_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    dept_head: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    uuid: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'department',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dept_id" },
        ]
      },
    ]
  });
  return Deaprtment
};
