var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//TODO
router.get('/user/:username', function(req, res, next) {
    res.send('respond with a resource ' +  req.params.username);
});



module.exports = router;
