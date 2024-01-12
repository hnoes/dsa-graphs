class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // Add a single vertex to the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // Add an array of vertices to the graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // Add an edge between two vertices
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // Remove an edge between two vertices
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // Remove a vertex and its edges from the graph
  removeVertex(vertex) {
    for (const adjacentNode of vertex.adjacent) {
      adjacentNode.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // Depth-First Search (Recursive)
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfs(node) {
      if (!node) return;
      visited.add(node);
      result.push(node.value);
      for (const neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }

    dfs(start);
    return result;
  }

  // Breadth-First Search
  breadthFirstSearch(start) {
    const queue = [start];
    const visited = new Set();
    const result = [];
    visited.add(start);

    while (queue.length) {
      const current = queue.shift();
      result.push(current.value);

      for (const neighbor of current.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

module.exports = { Graph, Node };
