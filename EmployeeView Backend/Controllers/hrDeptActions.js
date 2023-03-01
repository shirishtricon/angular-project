const express = require('express');
const db = require('../models')

const Departments = db.sequelize.models.departments;

const addDept = async (req, res) => {
    let deptName = req.body.dept_name;
    let deptHead = req.body.dept_head;

    await Departments.create({dept_name: deptName, dept_head: deptHead})
    .then(async () => {
        const result = await Departments.findOne({order: [ [ 'dept_id', 'DESC' ]], attributes: ['dept_id', 'dept_name']})
        res.status(200).json({result: result})
    }).catch((err) => {
        res.status(500).json({message: 'Internal Server Error'})
    })
}

const getAllDepts = async (req, res) => {
     await Departments.findAll().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"})
    })
}

module.exports = { addDept, getAllDepts }