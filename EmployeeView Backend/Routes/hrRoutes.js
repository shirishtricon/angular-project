const express = require('express');
const app = express();
const router = express.Router();
const query = require('../Controllers/hrActions');
const verifyToken = require('../Middlewares/verifyToken');
const cors = require('cors');


app.use(cors({
    origin: '*'
}));

router.get('/employees', verifyToken('HR'), query.readAllDetails);
router.post('/addEmployee', verifyToken('HR'), query.addEmployee);
router.delete('/delete/:emp_id', verifyToken('HR'), query.deleteEmployee);
router.put('/edit/:emp_id', verifyToken('HR'), query.editEmployee)
 
module.exports = router;    