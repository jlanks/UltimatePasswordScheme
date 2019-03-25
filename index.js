var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var _ = require("underscore"); 
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

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
app.post("/api/node", function(req,res){
  var newNode = req.body;
  console.log(newNode);
  var foundNode = _.find(data.nodes, function(node){
    return node.id ===  newNode.id;
  });
  if(foundNode){
    return;
  }
  data.nodes.push(newNode);

  res.send(newNode).end();
});
app.use("/api", function(req, res){
  res.send(data).end();

});

app.listen(8080, function(){
  console.log("Your server was stated on port 8080");
});
