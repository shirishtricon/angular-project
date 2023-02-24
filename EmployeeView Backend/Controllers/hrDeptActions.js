const express = require('express');
const app = express();
const uuid = require('uuid')

const conn = require('../Config/dbConnection');
const cors = require('cors');

const addDept = (req, res) => {
    let dept_name = req.body.dept_name;
    let dept_head = req.body.dept_head;
    let dept_uuid = uuid.v1();
    let query = `insert into department(dept_name, dept_head, uuid) values ("${dept_name}", "${dept_head}", "${dept_uuid}")`;

    conn.query(query, (err, result) => {
        if(err) {
            res.status(500).json({message:"Internal server error"})
            throw err;
        } else {
            conn.query('select dept_id, dept_name from department order by dept_id desc limit 1', (err, result) => {
                if(err) {
                    throw err;
                } else {
                    res.status(200).json({result: result})
                }
            })
        }
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