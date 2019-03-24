var express = require("express");
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.listen(8080, function(){
  console.log("Your server was stated on port 8080");
});
