import { consolidate, move, moveAll, moveToLimit } from "./kek.js";
import { Graph } from "./graph.js";

let startingDPV = { D: 0, P: 13, V: 6 };
let g = new Graph(startingDPV);

let currentNode = g.nodes[0];
let target = {
  D: 3,
  P: 13,
  V: 3,
};

let moves = 0;


//  currentNode
//
//  generate possible moves
//    - check if these moves exist in the network, adding them as nodes if not
//    - add them to current node edge list
//
//  pick a next node from possible moves
//    - try to find a node that doesnt exist in the list yet
//    - if not, look through the possibleMoves for a node that
//      hasn't been visited yet.
//    - at worst, select a random node

while(g.notEquals(currentNode.DPV, target)) {

  // generate next moves and update current node's edges
  let possibleMoves = consolidate(moveAll(currentNode.DPV), moveToLimit(currentNode.DPV))
  let updatedEdges = consolidate(currentNode.edges, possibleMoves);
  currentNode.edges = updatedEdges;

  let nextNode = null;

  // add nonexisting nodes to the network
  for(let i = 0; i < possibleMoves.length; i++) {
    let index = g.checkExist(possibleMoves[i]);
    if(index === null) {
      g.addNode(possibleMoves[i], []);
      nextNode = g.nodes[g.nodes.length-1];
    }
  }

  if(nextNode == null) { // all possibleNodes exist in the network
    let index = g.findUnvisitedNode(possibleMoves);
    if(index !== null) {
      nextNode = g.nodes[index];
    }
  }

  if(nextNode === null) {
    nextNode = move(possibleMoves);
    let index = g.checkExist(nextNode);
    nextNode = g.nodes[index];
  }

  currentNode = nextNode;
  currentNode.visited = true;
}

target = g.startingDPV;

while(g.notEquals(currentNode.DPV, target)) {

  // generate next moves and update current node's edges
  let possibleMoves = consolidate(moveAll(currentNode.DPV), moveToLimit(currentNode.DPV))
  let updatedEdges = consolidate(currentNode.edges, possibleMoves);
  currentNode.edges = updatedEdges;

  let nextNode = null;

  // add nonexisting nodes to the network
  for(let i = 0; i < possibleMoves.length; i++) {
    let index = g.checkExist(possibleMoves[i]);
    if(index === null) {
      g.addNode(possibleMoves[i], []);
      nextNode = g.nodes[g.nodes.length-1];
    }
  }

  if(nextNode == null) { // all possibleNodes exist in the network
    let index = g.findUnvisitedNode(possibleMoves);
    if(index !== null) {
      nextNode = g.nodes[index];
    }
  }

  if(nextNode === null) {
    nextNode = move(possibleMoves);
    let index = g.checkExist(nextNode);
    nextNode = g.nodes[index];
  }

  currentNode = nextNode;
  currentNode.visited = true;
}


console.log(g.nodes);