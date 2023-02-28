
module.exports = (sequelize, DataTypes) => {
    const departments = sequelize.define('departments', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },

        dept_id: {
            unique: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },

        dept_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        dept_head: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },         
    {
        timestamps: false
    });
    return departments;
}