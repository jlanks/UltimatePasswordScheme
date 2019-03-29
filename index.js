var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var _ = require("underscore");
var uuid = require("uuid-v4");
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

var data = {
  /*
  nodes: [
    {id: "One", label: "1 "},
    {id: "Two", label: " 2"},
    {id: "Three", label: "3 "},
    {id: "Four", label: " 4"},
    {id: "Eight", label: " 8"},
    {id: "Six", label: " 6"}
  ],
*/
  //
  nodes: randomNodes(),
  edges: [
    {id: "1", from: "Node 1", to: "Node 3"},
    {id: "2",  from: "Node 1", to: "Node 4"},
    {id: "3", from: "Node 2", to: "Node 3"},
    {id: "4", from: "Node 1", to: "Node 2"}
  ],
  options: {}
};

// create an array of nodes
console.log(randomNodes());
 function randomNodes(){
  var nodes = [];
  for(i = 1;i<10;i++){
    var node = {id: null, label: null};
    node.id = "" + i;
    node.label = "Node " + i;
    nodes.push(node);

  }
  return nodes;
}

// create an array of random edges

// create a random graph object


//print the data object's edge set:
data.edges.forEach(function(element){
    console.log(element);
    console.log(element.from);

});


//store all the node string, prepare to random
var nodeChoice=[];
data.nodes.forEach(function(element){
    nodeChoice.push(element.id);

});
nodeChoice.forEach(function(element){
    console.log(element);
});


nodeChoice.forEach(function(element){
    console.log(element);
});



//here is the random edge that overwrite the edge array in data object
var edgeChoice ={};
data.edges.forEach(function(element){
    element.from = nodeChoice[Math.floor(Math.random()*nodeChoice.length)];
    element.to = nodeChoice[Math.floor(Math.random()*nodeChoice.length)];
    console.log(element);

});





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

app.put("/api/node", function (req, res){
    var updatedNode = req.body;

    var realizedNode;
    _.each(data.nodes, function(node){
      if(node.id === updatedNode.id){
        node.label = updatedNode.label;
        realizedNode = node;
      }
    });
    res.send(realizedNode).end();
});


app.delete("/api/node", function(req,res){
  var deleteNode = req.body.node;
  var deleteResult = {
    nodes:[],
    edges: []
  };

  var updatedNodes = _.filter(data.nodes, function(node){
    var keep = (node.id !== deleteNode);
    if(!keep){
      deleteResult.nodes.push(node);
    }
    return keep;
  });
  var updatedEdges = _.filter(data.edges, function(edge){
    var keep = (edge.from  !== deleteNode) || (edge.to  !== deleteNode);
    if(!keep){
      deleteResult.edges.push(edge);
    }
    return keep;
  });

  data.nodes = updatedNodes;
  data.edges = updatedEdges;

  res.send(deleteResult).end();


});

app.post("/api/edge", function(req,res){
  var newEdge = req.body;

  newEdge.id = uuid();
  data.edges.push(newEdge);

  res.send(newEdge).end();

});

app.put("/api/edge", function(req, res){
  var updatedEdge = req.body;

  var realizedEdge;
  _.each(data.edges, function(edge){
      if(edge.id === updatedEdge.id){
        edge.from = updatedEdge.from;
        edge.to = updatedEdge.to;
        realizedEdge = edge;
      }
  });
  res.send(realizedEdge).end();
});

app.delete("/api/edge", function(req,res){
  var deleteEdge = req.body.edge;
  var deleteResult = {
    nodes: [],
    edges: []
  };

  var updatedEdges = _.filter(data.edges, function(edge){
    var keep = (edge.id !== deleteEdge);

    if (!keep){
      deleteResult.edges.push(edge);

    }
    return keep;
  });
  data.edges = updatedEdges;
  res.send(deleteResult).end();

});

app.use("/api", function(req, res){
  res.send(data).end();

 });

app.listen(3000, function(){

  console.log("Your server was stated on port 3000");


});
