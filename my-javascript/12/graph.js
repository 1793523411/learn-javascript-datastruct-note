function defaultToString(item) {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}:${this.value}]`;
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }
  values() {
    return this.keyValues().map((valuePair) => valuePair.value);
  }
  keys() {
    return this.keyValues().map((valuePair) => valuePair.key);
  }
  keyValues() {
    return Object.values(this.table);
  }
  // keyValues() {
  //   console.log(this.table)
  //   const valuePairs = [];
  //   for (const k in this.table) {
  //     // {1}
  //     if (this.hasKey(k)) {
  //       valuePairs.push(this.table[k]); // {2}
  //     }
  //   }
  //   return valuePairs;
  // }
  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return Object.keys(this.table).length;
  }
  clear() {
    this.table = {};
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    return objString;
  }
}

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = [];
    this.adjList = new Dictionary();
  }
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }
  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v).push(w);
    if (!this.isDirected) this.adjList.get(w).push(v);
  }
  getVertices() {
    return this.vertices;
  }
  getAdjList() {
    return this.adjList;
  }
  toString() {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} ->`;
      const neigjbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neigjbors.length; j++) {
        s += `${neigjbors[j]} `;
      }
      s += "\n";
    }
    return s;
  }
}
let graph = new Graph();
let myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; // {12}
for (let i = 0; i < myVertices.length; i++) {
  // {13}
  graph.addVertex(myVertices[i]);
}
graph.addEdge("A", "B"); // {14}
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

console.log(graph.toString());

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2,
};

const initialzeColor = (vertices) => {
  const color = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
};

class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  isEmpty() {
    // return this.count - this.lowestCount === 0
    return this.size() === 0;
  }
  size() {
    return this.count - this.lowestCount;
  }
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initialzeColor(vertices);
  const queue = new Queue();
  queue.enqueue(startVertex);
  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
    if (callback) {
      callback(u);
    }
  }
};

const printVertex = (value) => console.log("Visted vertex: ", value);

breadthFirstSearch(graph, myVertices[0], printVertex);

const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initialzeColor(vertices);
  const queue = new Queue();
  const distance = {};
  const predecessors = {};
  queue.enqueue(startVertex);

  for (let i = 0; i < vertices.length; i++) {
    distance[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }
  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.WHITE;
        distance[w] = distance[u] + 1;
        predecessors[w] = u;
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
  }
  return {
    distance,
    predecessors,
  };
};
const shortestPathA = BFS(graph, myVertices[0]);
console.log(shortestPathA);

const formVertex = myVertices[0];
for (i = 1; i < myVertices.length; i++) {
  const toVertex = myVertices[i];
  const path = new Array();
  for (v = toVertex; v !== formVertex; v = shortestPathA.predecessors[v]) {
    path.push(v);
  }
  path.push(formVertex);
  let s = path.pop();
  while (path[0]) {
    s += " - " + path.pop();
  }
  console.log(s);
}

// Dijkstra 算法解决了单源最短路径问题。Bellman-Ford 算法解决了边权值为负
// 的单源最短路径问题。A*搜索算法解决了求仅一对顶点间的最短路径问题，用经验法则来加速搜
// 索过程。Floyd-Warshall 算法解决了求所有顶点对之间的最短路径这一问题

const depthFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initialzeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVist(vertices[i], color, adjList, callback);
      console.log("++");
    }
  }
};

const depthFirstSearchVist = (u, color, adjList, callback) => {
  color[u] = Colors.GREY;
  if (callback) {
    callback(u);
  }
  const neighbores = adjList.get(u);
  for (let i = 0; i < neighbores.length; i++) {
    const w = neighbores[i];
    if (color[w] === Colors.WHITE) {
      depthFirstSearchVist(w, color, adjList, callback);
    }
  }
  color[u] = Colors.BLACK;
};

console.log("----------------");

console.log(graph.toString());

depthFirstSearch(graph, printVertex);

const DFS = (graph) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initialzeColor(vertices);
  const d = {};
  const f = {};
  const p = {};
  const time = { count: 0 };
  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }
  return {
    discovery: d,
    finish: f,
    predecessors: p,
  };
};

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = Colors.GREY;
  d[u] = ++time.count;
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      p[w] = u;
      DFSVisit(w, color, d, f, p, time, adjList);
    }
  }
  color[u] = Colors.BLACK;
  f[u] = ++time.count;
};
// 1 <= d [u] < f [u] <= 2|V|

console.log(DFS(graph))
console.log('++++++++++++++++++')

graph = new Graph(true); // 有向图
myVertices = ['A', 'B', 'C', 'D', 'E', 'F'];
for (i = 0; i < myVertices.length; i++) {
graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('F', 'E');
console.log(graph.toString())
const result = DFS(graph);
console.log(result)

//!以倒序来排序完成时间数组，就是最终的拓扑排序，且不止一种
const fTimes = result.finish
s = ''
for(let count = 0; count < myVertices.length; count++){
    let max = 0
    let maxName = null
    for(i = 0;i<myVertices.length;i++){
        if(fTimes[myVertices[i]] > max){
            max = fTimes[myVertices[i]]
            maxName = myVertices[i]
        }
    }
    s += ' - ' + maxName
    delete fTimes[maxName]
}

console.log(s)