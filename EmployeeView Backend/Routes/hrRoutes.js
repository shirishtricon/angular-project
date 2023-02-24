const express = require('express');
const app = express();
const router = express.Router();
const empActions = require('../Controllers/hrEmpActions');
const deptActions = require('../Controllers/hrDeptActions')
const verifyToken = require('../Middlewares/verifyToken');
const cors = require('cors');


app.use(cors({
    origin: '*'
}));

router.get('/employees', verifyToken('HR'), empActions.readAllDetails);
router.get('/departments', verifyToken('HR'), deptActions.getAllDepts)

router.post('/addEmployee', verifyToken('HR'), empActions.addEmployee);
router.post('/addDepartment',verifyToken('HR'), deptActions.addDept)

router.delete('/delete/:uuid', verifyToken('HR'), empActions.deleteEmployee);

router.put('/edit/:uuid', verifyToken('HR'), empActions.editEmployee)
 
module.exports = router;    