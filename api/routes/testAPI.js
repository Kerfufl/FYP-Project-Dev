var express = require("express");
var router = express.Router();


router.get("/", function(req,res,next) {
    res.send("API should be working");
});

router.post("/", function(req,res,next) {
    console.log(req.body);
    let b = req.body.name;
    res.send(`We got ${b} ${req.body.l_name}`);
});

module.exports = router;