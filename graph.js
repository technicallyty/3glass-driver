const D_MAX = 19;
const P_MAX = 13;
const V_MAX = 7;

class Graph {
  constructor(DPV) {
    this.startingDPV = { D: 0, P: 13, V: 6 };
    this.nodes = [
      {
        DPV,
        edges: [],
        visited: true,
      },
    ];
  }

  addNode(DPV, edges) {
    this.nodes.push({
      DPV,
      edges,
      visited: false
    });
  }

  checkExist(dpv) {
    // check if node exists, returning its index otherwise returning null
    for (let i = 0; i < this.nodes.length; ++i) {
      let node = this.nodes[i].DPV;
      if (node.D === dpv.D && node.P === dpv.P && node.V === dpv.V) {
        return i;
      }
    }
    return null;
  }

  addEdge(dpv) {
    let index = this.checkExist(dpv);
    if (index !== null) {
      this.nodes[index].edges.push(dpv);
    }
  }

  notEquals(dpv1, dpv2) {
    if (dpv1.D === dpv2.D && dpv1.P === dpv2.P && dpv1.V === dpv2.V) {
      return false;
    }
    return true;
  }

  // finds an unvisited node and returns its index, otherwise null
  findUnvisitedNode(nodeSet) { 
    for(let i = 0; i < nodeSet.length; i++) {
      let index = this.checkExist(nodeSet[i]);
      if(index !== null) {  // it exists in the set
        if(this.nodes[index].visited === false) {
          return index;
        }
      }
    }
    return null;
  }

  shortestPath(dpv) {
    
  }
}

export { Graph };
