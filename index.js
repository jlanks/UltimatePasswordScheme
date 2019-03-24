var express = require("express");
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

var data = {
  nodes: [
    {id: "One", label: "1 "},
    {id: "Two", label: " 2"},
    {id: "Three", label: "3 "},
    {id: "Four", label: " 4"},
    {id: "Eight", label: " 8"},
    {id: "Six", label: " 6"}
  ],
  edges: [],
  options: {}
};
app.use("/api", function(req, res){
  res.send(data).end();

});

app.listen(8080, function(){
  console.log("Your server was stated on port 8080");
});
