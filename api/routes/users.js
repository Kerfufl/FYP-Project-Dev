var express = require('express');
var bcry = require('bcrypt');
var maridb = require('../components/mdbconfig');

var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req,res,next) {
  maridb.then(con=> {
    con.query(`SELECT * FROM user_test WHERE user = '${req.body.user}'`)
    .then((usr => {
      if (usr.length == 0)
      {
        bcry.hash(req.body.pass,10)
        .then(hashPass => 
          {
      
            con.query(`INSERT INTO user_test VALUES ('${req.body.user}','${hashPass}')`)
            res.send(`${req.body.user} has been registered`)
            
          })
        
      } else {
        res.send(`${req.body.user} has already been registered`);
      }
    }))
  })
  
  // bcry.hash(req.body.pass,10)
  //   .then(hashPass => {
      
  //       //conn.query(`INSERT INTO user_test VALUES ('${req.body.user}','${hashPass}')`)
  //       console.log(`${hashPass.length}`)
      
  //   })
  // if (req.body.user == 'John') {
  //   res.send("So true, bestie")
  // } else {
  //   res.send("Incorrect >:(")
  // }
});

module.exports = router;
