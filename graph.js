class Graph {
  constructor(DPV) {
    this.nodes = [
      {
        DPV,
        edges: [],
      },
    ];
  }

  addNode(DPV, edges) {
    this.nodes.push({
      DPV,
      edges,
    });
  }

  checkExist(dpv) {
    // check if node exists, returning its index otherwise returning null
    for (let i in this.nodes) {
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

  shortestPath(dpv) {
    
  }
}

export { Graph };
