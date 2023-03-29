var express = require('express');
var mdb = require('../components/mdbconfig')
var router = express.Router();

router.post('/', function(req, res, next) {
    mdb.then(conn => {
        conn.query(`INSERT INTO fyp_models (title, user_name, date_created, model_link, tags) VALUES ('${String(req.body.title)}','${String(req.body.uname)}','${String(req.body.date)}','${(String(req.body.url))}', '[${String(req.body.tag)}]')`).then(
            console.log("Model logged")
        )
    })

});

module.exports = router;