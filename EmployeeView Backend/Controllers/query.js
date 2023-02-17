const conn = require('../Config/dbConnection')

const readAllDetails = (req,res) => {
    conn.query('select * from employee', (err,data) => {
        if (err) {
            throw err;
        }
        res.status(200).send(data);
    })
}

module.exports = { readAllDetails };