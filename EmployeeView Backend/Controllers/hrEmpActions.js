const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../models');

const Employees = db.sequelize.models.employees;
const Departments = db.sequelize.models.departments;


app.use(cors({
    origin: '*'
}));    

const readAllDetails = async(req,res) => {
    Employees.belongsTo(Departments,{foreignKey: 'departmentUuid'});
    Departments.hasMany(Employees,{foreignKey : 'departmentUuid'});
    const data = await Employees.findAll({include: [Departments]})
    res.status(200).send(data)

};

const addEmployee = async (req, res) => {
    let name = req.body.name;
    let designation = req.body.designation;
    let experience = +req.body.experience;
    let skills = req.body.skills;
    let image = req.body.image;
    let departmentUuid = req.body.departmentUuid;

    Employees.create({
        name : name,
        designation: designation,
        experience: experience,
        skills: skills,
        image: image,
        departmentUuid: departmentUuid
    }).then(async () => {
        const data = await Employees.findOne({order: [ [ 'emp_id', 'DESC' ]], attributes: ['emp_id', 'name']})
        res.status(200).json({result:data})
    }).catch((err) => {
        res.status(500).json({message: 'Internal Server Error'})
    }) 
};

const deleteEmployee = async (req, res) => {
    let uuid = req.params.uuid;
    
    await Employees.destroy({ where: { uuid : uuid}}).then(() => {
        res.status(200).json({message: 'Employee deleted successfully!'})
    }).catch((err) => {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
    })
}

const editEmployee = async (req,res) => {
    let uuid = req.params.uuid;
    if(!uuid || req.body.uuid) {
        res.status(400).json({message: "Bad Request!"})
    } else {
        await Employees.update(req.body, {
            where: {
              'uuid': uuid
            }
        }).then(() => {
            res.status(200).json({message: 'Details updated successfully!'});
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'})
        })
    }
}

module.exports = { readAllDetails, addEmployee, deleteEmployee, editEmployee };