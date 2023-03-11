var express = require('express');
var bcry = require('bcrypt');
//var mdb = require('mariadb');
var maridb = require('../components/mdbconfig');

var router = express.Router();

// b = mdb.createConnection(
//   {
//       user:"root",
//       host: "localhost",
//       database: "fyp_db"
//   }

// )

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req,res,next) {
  bcry.hash(req.body.pass,10)
    .then(hashPass => {
      maridb.then(conn => {
        //conn.query(`INSERT INTO user_test VALUES ('${req.body.user}','${hashPass}')`)
        console.log("jobs done")
      })
    })
  if (req.body.user == 'John') {
    res.send("So true, bestie")
  } else {
    res.send("Incorrect >:(")
  }
});

module.exports = router;
