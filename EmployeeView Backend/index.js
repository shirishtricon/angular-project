const express = require('express');
const jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
const app = express();
const secretKey = 'secretKey';
const cors = require('cors');
const dbConnection = require('./Config/dbConnection')
const dotenv = require("dotenv");
const hrRoutes = require('./Routes/hrRoutes')

app.use(cors({
    origin: '*'
}));

dotenv.config();

app.use('/hr',hrRoutes);


const hrDetails = {
    name: 'Shirish',
    role: 'HR',
    emp_id: 123,
    password: 'admin'
};

const managerDetails = {
    name: 'Preetham',
    role: 'Manager',
    emp_id: 124,
    password: 'Manager'
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req,res) => {
    emp_id = req.body.emp_id;
    password = req.body.password;
    role = req.body.newRole
    console.log(+emp_id);
    
    if(role === 'HR') { 
        if(+emp_id === hrDetails.emp_id && password === hrDetails.password && role === hrDetails.role) {
            console.log('condition is true')
            const user = {
                emp_id:hrDetails.emp_id,
                role: hrDetails.role,
                name: hrDetails.name
            }
            jwt.sign((user),secretKey,{expiresIn: '300s'}, (err,token) => {
                res.status(200).json({token: token})
            })
            
        } else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    } else if(role === 'Manager') {
        if(+emp_id === managerDetails.emp_id && password === managerDetails.password && role === managerDetails.role) {
            console.log('condition is true')
            const user = {
                emp_id:managerDetails.emp_id,
                role: managerDetails.role,
                name: managerDetails.name
            }
            jwt.sign((user),secretKey,{expiresIn: '300s'}, (err,token) => {
                res.json({token: token}).status(200).json({message: 'login successful'})
            })
           
        } else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    } else {
        res.status(401).json({message: 'Unown role'})
    }
     
    

  
});

app.post('/profile',verifyToken,(req,res) => {
    jwt.verify(req.token, secretKey, (err,authData) => {
        if(err) {
            res.send({result: 'Invalid Token'})
        } else {
            res.json({message: "profile accessed", authData})
        }
    })
})

function verifyToken(req,res,next) {
    console.log('in verify function')
    const bearerHeader = req.headers['token'];
    console.log(typeof bearerHeader)
    if(typeof bearerHeader !== 'undefined') {
        const token = bearerHeader;
        req.token = token;
        next()
    } else {
        res.send({result: 'Invalid Token'})
    }
}

app.listen(5000, () => {
    console.log('App is running on port 5000');
});
