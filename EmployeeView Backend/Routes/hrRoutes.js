const express = require('express');
const router = express.Router();
const query = require('../Controllers/query')

router.get('/employees', query.readAllDetails)
 
module.exports = router;