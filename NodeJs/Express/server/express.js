/**
 * Created by sq_xu on 2015/4/30.
 */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
//app.use(express.bodyParser());
app.post('/', function(req, res){
    //res.send(req.body.title + req.body.text);
    console.log("req.hostname: " + req.hostname);
    console.log("req.ip: " + req.ip );
    console.log(req.body);
    res.json(req.body);
});

app.listen(5000);