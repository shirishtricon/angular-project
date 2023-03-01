
module.exports = (sequelize, DataTypes) => {
    const employees = sequelize.define('employees', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },

        emp_id: {
            unique: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departmentUuid: {
            type: DataTypes.STRING,
            allowNull: false
        }
        // dept_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: departments,
        //         key: 'dept_id'
        //     }
        // }

    },         
    {
        timestamps: false
    },
    {
		initialAutoIncrement: 1000
	});
    return employees;
}