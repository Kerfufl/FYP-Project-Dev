var express = require('express');
var mdb = require('../components/mdbconfig')
var router = express.Router();


router.get('/', function(req, res, next) {
    
    mdb.then(conn => {
        conn.query("SELECT * FROM fyp_models").then(
            (rows => {
                //console.log(rows);
                res.send(rows);
                
            })
        )
    })

});

router.post('/', function(req, res, next) {
    mdb.then(conn => {
        conn.query(`SELECT * FROM fyp_models WHERE ${String(req.body.stype)} LIKE '%${String(req.body.term)}%'`).then(
            (rows => {
                //console.log(`SELECT * FROM fyp_models where ${String(req.body.stype)} LIKE '%${String(req.body.term)}%'`);
                if (rows.length == 0) console.log("oops");
                res.send(rows);
            })
        )
    })

});
  


module.exports = router;