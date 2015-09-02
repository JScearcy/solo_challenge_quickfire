var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, '../models/students.json');

/* GET students listing and return to client */
router.get('/', function(req, res, next) {
  fs.readFile(file, function(err, data){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(JSON.parse(data));
  })
});
//When new student data is sent to the /students route via POST method - this will add it to the students.json file
router.post('/', function(req, res, next) {
  var postData = {
    firstname: req.body.firstName,
    lastname: req.body.lastName
  };
  //if for some reason no data is sent then we just send back an OK status
   if(postData.firstname != '' && postData.lastname != '') {
     fs.readFile(file, function (err, data) {
       if (err) {
         console.log(err);
         res.sendStatus(500);
       }
       var studentsArray = JSON.parse(data);
       studentsArray.push(postData);
       fs.writeFile(file, JSON.stringify(studentsArray), function (err) {
         if (err) {
           console.log(err);
           res.sendStatus(500);
         }
         res.sendStatus(200);
       })
     })
   } else {
     //this is only if no data was sent 
     res.sendStatus(200);
   }
});

module.exports = router;
