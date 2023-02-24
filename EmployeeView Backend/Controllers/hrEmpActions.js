const express = require('express');
const app = express();
const uuid = require('uuid')
const conn = require('../Config/dbConnection');
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

const readAllDetails = (req,res) => {
    conn.query('select emp_id, name, designation, experience, skills, image, dept_name from employee inner join department on employee.dept_id = department.dept_id', (err,data) => {
        if (err) {
            throw err;
        }
        res.status(200).send(data);
    })
};

const addEmployee = (req, res) => {
    let name = req.body.name;
    let designation = req.body.designation;
    let experience = +req.body.experience;
    let skills = req.body.skills;
    let image = req.body.image;
    let dept_id = +req.body.dept_id;
    let emp_uuid = uuid.v1();

    let query = `INSERT INTO employee (name, designation, experience, skills, image, dept_id, uuid) VALUES ("${name}", "${designation}", ${experience}, "${skills}", "${image}", "${dept_id}", "${emp_uuid}")`;
    conn.query(query, function(err, result) {
        if (err) {
            res.status(500).json({message: 'Internal Server error'})
            throw err;   
        } else {
            conn.query('select emp_id, name from employee order by emp_id desc limit 1', (err, result) => {
                if(err) {
                    throw err;
                } else {
                    res.status(200).json({result: result})
                }
            })
            
        }
      });
};

const deleteEmployee = (req, res) => {
    let emp_id = +req.params.emp_id;
    let query = `delete from employee where emp_id = ${emp_id}`;
    
    conn.query(query, (err, result) => {
        if(err) {
            res.status(500).json({message: "Internal serve error"});
        }
        else {
            res.status(200).json({message: "Employee deleted successfully"})
        }
    });
}

const editEmployee = (req,res) => {
    let emp_id = +req.params.emp_id;
    if(!emp_id || req.body.emp_id) {
        res.status(400).json({message: "Bad Request!"})
    } else {
        conn.query(`update employee set ? where emp_id = ?`,[req.body, emp_id], (err, result) => {
            if(err) {
                res.status(500).json({message: "Internal Server error"})
            } else {
                res.status(200).json({message: "Details updated successfully"})
            }
        });
    }
}

module.exports = { readAllDetails, addEmployee, deleteEmployee, editEmployee };