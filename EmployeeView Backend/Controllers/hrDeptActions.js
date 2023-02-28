const express = require('express');
const db = require('../models')
const app = express();
const uuid = require('uuid')

const Departments = db.sequelize.models.departments;

const conn = require('../Config/dbConnection');
const cors = require('cors');

const addDept = async (req, res) => {
    let deptName = req.body.dept_name;
    let deptHead = req.body.dept_head;
    // let dept_uuid = uuid.v1();
    // let query = `insert into department(dept_name, dept_head, uuid) values ("${dept_name}", "${dept_head}", "${dept_uuid}")`;

    // conn.query(query, (err, result) => {
    //     if(err) {
    //         res.status(500).json({message:"Internal server error"})
    //         throw err;
    //     } else {
    //         conn.query('select dept_id, dept_name from department order by dept_id desc limit 1', (err, result) => {
    //             if(err) {
    //                 throw err;
    //             } else {
    //                 res.status(200).json({result: result})
    //             }
    //         })
    //     }
    // })

    let data = await Departments.build({dept_name: deptName, dept_head: deptHead});
    await data.save().then(() => {
        res.status(200).json({message: 'Data inserted successfully'})
    }).catch((err) => {
        res.status(500).json({message: 'Internal Server Error'})
    })
}

const getAllDepts = (req, res) => {
    conn.query('select * from department', (err, result) => {
        if(err) {
            throw err;
        }
        res.status(200).send(result);
    })
}

module.exports = { addDept, getAllDepts }