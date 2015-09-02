var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var file = path.join(__dirname, '../models/students.json');
  fs.readFile(file, function(err, data){
    students = JSON.parse(data);
    res.render('index', {students: students});
  });
});

module.exports = router;
