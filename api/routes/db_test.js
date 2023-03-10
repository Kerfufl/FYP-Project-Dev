var express = require('express');
var mdb = require("mariadb");
var router = express.Router();

b = mdb.createConnection(
    {
        user:"root",
        host: "localhost",
        database: "fyp_db"
    }

)

router.get('/', function(req, res, next) {
    // res.send('bruh');
    
    b.then(conn => {
        conn.query("SELECT * FROM fyp_models").then(
            (rows => {
                //console.log(rows);
                res.send(rows);
                
            })
        )
    })

});

router.post('/', function(req, res, next) {
    // res.send('bruh');
    
    b.then(conn => {
        conn.query(`SELECT * FROM fyp_models where ${String(req.body.stype)} = '${String(req.body.term)}'`).then(
            (rows => {
                //console.log(rows);
                if (rows.length == 0) console.log("oops");
                res.send(rows);
                
            })
        )
    })

});
  


module.exports = router;