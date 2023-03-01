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
        conn.query("SELECT * FROM fyp_users").then(
            (rows => {
                //console.log(rows[0]['first_name']);
                //res.send(rows[0]);
                res.json({
                    first_name: rows[0]['first_name'],
                    last_name: rows[0]['last_name']
                }
                )
            })
        )
    })

});
  
module.exports = router;