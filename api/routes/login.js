var express = require('express');
var bcry = require('bcrypt');
var jwt = require('jsonwebtoken');
var maridb = require('../components/mdbconfig');

var router = express.Router();

router.post('/', function(req,res,next) {
    maridb.then(con=> {
      con.query(`SELECT * FROM user_test WHERE user = '${req.body.user}'`)
      .then((usr => {
        if (usr.length == 0)
        {
            res.send("No users withh that username");
        } else {
            const tok = jwt.sign( 
                {
                    user: req.body.user,
                },
                "Rando",
                {expiresIn: "2h"}
            );
            res.send({message:"Login bruh",token: tok, uname: req.body.user});
            //res.send(`${req.body.user} is now logged in`);
            
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