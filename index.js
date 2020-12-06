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

while (true) {
  let dpv = currentNode.DPV;

  if (dpv.D === target.D && dpv.P === target.P && dpv.V === target.V) {
    console.log(dpv);
    console.log("target hit.");
    break;
  }

  //  first - get the possible moves, and pick a DPV to move to.
  let possibleMoves = consolidate(
    moveAll(currentNode.DPV),
    moveToLimit(currentNode.DPV)
  );

  let pick = null;
  for (var i in possibleMoves) {
    let test = g.checkExist(possibleMoves[i]);
    if (test == null) {
      pick = possibleMoves[i];
      break;
    }
  }
  if (pick === null) {
    pick = move(possibleMoves);
  }

  //let pick = move(possibleMoves);

  // check if it exists, returning the index, otherwise null
  var index = g.checkExist(pick);

  // case null - the picked node doesn't yet exist in the network.
  if (index === null) {
    // node doesnt exist yet, so create a new node with inital edge current node, and add the picked node to current nodes edge list
    g.addNode(pick, [currentNode.DPV]);
    currentNode.edges.push(pick);
    currentNode = g.nodes[g.nodes.length - 1];
  } else {
    // the node already exists, so we should check if it already has the connection and then add it if not
    // add the edge to the node we are going to, removing duplicates.

    let edges = g.nodes[index].edges;
    let newEdge = [currentNode.DPV];
    let newEdges = consolidate(edges, newEdge);
    g.nodes[index].edges = newEdges;

    // add the node's DPV we are going to to the current nodes edge table, removing duplicates
    // commenting this out because you dont always know that you can go from the nextNode to the currentNode.
    /*
    edges = currentNode.edges;
    newEdge = [pick];
    let newerEdges = consolidate(edges, newEdge);
    currentNode.edges = newerEdges;
    */
    currentNode = g.nodes[index];
  }
  moves++;
}

console.log(g.nodes);
console.log(g.nodes.length);
