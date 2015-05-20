var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express231' });
});
*/

//TODO P100
exports.index = function(req, res) {
    res.render('index', { title: 'Express' });
};
exports.hello = function(req, res) {
    res.send('The time is ' + new Date().toString());
};

module.exports = exports;
