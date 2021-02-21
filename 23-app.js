'use strict';

class App extends React.Component {

  nodes = [];
  canvas = React.createRef();
  ctx = null;
  lastX = null;
  lastY = null;
  isDraw = false;
  top = 0;
  left = 0;
  start = null;
  end = null;

  constructor(props) {
    super(props);

    console.log("starting app");

    this.state = {
      size: 20,
      width: 50,
      height: 25,
      mouseDown: false,
      change: false,
      selectedDraw: 'none',
      selectedAlgo: 'dfs',
      astarDistance: 'euclidian',
      astarHeuristic: 'total'
    }

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onDrawChange = this.onDrawChange.bind(this);
    this.onAlgoChange = this.onAlgoChange.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onAlgoAStarDistanceChange = this.onAlgoAStarDistanceChange.bind(this);
    this.onAlgoAStarHeuristicChange = this.onAlgoAStarHeuristicChange.bind(this);

    let array = new Array(this.state.height);
    for (let i = 0; i < this.state.height; i++) {
      array[i] = new Array(this.state.width);
      for (let j = 0; j < this.state.width; j++) {
        let node = new Node();
        node.id = (i * this.state.width) + j;
        node.x = j;
        node.y = i;
        array[i][j] = node;
      }
    }

    this.nodes = array;
    let startW = Math.floor(this.state.width / 10);
    let startH = Math.floor(this.state.height / 10);
    this.start = this.nodes[startH][startW];
    this.start.isStart = true;
    this.end = this.nodes[this.state.height - startH][this.state.width - startW];
    this.end.isEnd = true;
  }

  componentDidMount() {
    this.top = this.canvas.current.getBoundingClientRect().y;
    this.left = this.canvas.current.getBoundingClientRect().x;
    this.ctx = this.canvas.current.getContext("2d");
    this.drawNodes();
  }

  selectNode(node) {
    //console.log('selection ', this.state.selectedDraw)
    if (this.state.selectedDraw === 'wall' && !node.isStart && !node.isEnd) {
      node.isWall = true;
      //console.log('wall');
    }
    else if (this.state.selectedDraw === 'eraser' && !node.isStart && !node.isEnd) {
      node.isWall = false;
      //console.log('not wall');
    }
    else if (this.state.selectedDraw === 'start') {
      this.start.isStart = false;
      this.drawNode(this.start, true);
      node.isStart = true;
      this.start = node;
      //console.log('not wall');
    }
    else if (this.state.selectedDraw === 'end') {
      this.end.isEnd = false;
      this.drawNode(this.end, true);
      node.isEnd = true;
      this.end = node;
      //console.log('not wall');
    }
  }

  drawNodes() {
    this.nodes.flat().forEach(node => {
      this.drawNode(node);
    });
    this.ctx.stroke();
  }

  drawNode(node, stroke = false) {
    let x = node.x * this.state.size;
    let y = node.y * this.state.size;
    this.ctx.strokeStyle = "#aaaaaa";

    if (node.isVisited === true) {
      this.ctx.fillStyle = "#ffffff";
    }
    else {
      this.ctx.fillStyle = "#cccccc";
    }

    if (node.isPath === true) {
      this.ctx.fillStyle = "#00ff00";
    }

    if (node.isWall === true) {
      this.ctx.fillStyle = "#000000";
    }

    if (node.isStart === true) {
      this.ctx.fillStyle = "#ff0000";
    }
    if (node.isEnd === true) {
      this.ctx.fillStyle = "#0000ff";
    }

    this.ctx.fillRect(x, y, this.state.size, this.state.size);
    this.ctx.rect(x, y, this.state.size, this.state.size);

    if (stroke === true)
      this.ctx.stroke();
  }

  findNode(x, y) {
    let x2 = Math.floor(x / this.state.size);
    let y2 = Math.floor(y / this.state.size);
    let node = this.nodes[y2][x2];
    return node;
  }

  onMouseDown(event) {
    //console.log('mouse down');
    this.isDraw = true;
    let posX = event.nativeEvent.layerX;
    let posY = event.nativeEvent.layerY;
    let node = this.findNode(posX, posY);
    this.selectNode(node);
    this.drawNode(node, true);
  }

  onMouseMove(event) {
    let posX = event.nativeEvent.layerX;
    let posY = event.nativeEvent.layerY;
    let node = this.findNode(posX, posY);
    //console.log(`[${posX},${posY}] [${node.x},${node.y}] - ${this.isDraw}`);
    if (this.isDraw == false)
      return;

    this.selectNode(node);
    this.drawNode(node, true);
  }

  onMouseUp(event) {
    //console.log('mouse up');
    this.isDraw = false;
  }

  onMouseOut(event) {
    //console.log('mouse out');
    this.isDraw = false;
  }

  onDrawChange(event) {
    this.setState({
      selectedDraw: event.target.value
    });
  }

  onAlgoChange(event) {
    //console.log(`algo chosen: ${event.target.value}`);
    this.setState({
      selectedAlgo: event.target.value
    });
  }

  onAlgoAStarDistanceChange(event) {
    this.setState({
      astarDistance: event.target.value
    });
  }

  onAlgoAStarHeuristicChange(event) {
    this.setState({
      astarHeuristic: event.target.value
    });
  }

  onStart() {
    this.onClear();
    let algoName = this.state.selectedAlgo;
    //console.log(`start with ${algoName}`);

    let algo = null;
    if (algoName === 'dfs') {
      algo = new DfsAlgo(this.nodes, this.start, this.end, (node) => {
        this.drawNode(node);
      });
    }
    else if (algoName === 'bfs') {
      algo = new BfsAlgo(this.nodes, this.start, this.end, (node) => {
        this.drawNode(node);
      });
    }
    else if (algoName === 'dijkstra') {
      algo = new DijkstraAlgo(this.nodes, this.start, this.end, (node) => {
        this.drawNode(node);
      });
    }
    else if (algoName === 'astar') {
      algo = new AStarAlgo(this.nodes, this.start, this.end, (node) => {
        this.drawNode(node);
      }, this.state.astarDistance, this.state.astarHeuristic);
    }

    let startTime = new Date();
    algo.start();
    let endTime = new Date();
    let elapsed = endTime - startTime;
    let path = algo.returnPath();
    if (path.length === 0) {
      this.setState({
        result: `No path found in ${elapsed}ms`
      });
    }
    else {
      path.forEach(node => {
        node.isPath = true;
      })
      //console.log(this.end);
      this.setState({
        result: `path length is ${this.end.length} in time ${elapsed}ms`
      });
    }
    this.drawNodes();
  }

  onClear() {
    this.nodes.flat().forEach(node => {
      node.isVisited = false;
      node.isPath = false;
    })
    this.drawNodes();
  }

  render() {
    let style = {
      width: (this.state.width * this.state.size) + 'px',
      height: (this.state.height * this.state.size) + 'px'
    }
    return (
      <div className="main">
        <div className="header">
          <div>
            <label>Draw:</label>
            <label>
              <input type="radio" name="draw" value="none" checked={this.state.selectedDraw === 'none'}
                onChange={this.onDrawChange} />
                None
            </label>
            <label>
              <input type="radio" name="draw" value="wall"
                onChange={this.onDrawChange} />
              Wall
            </label>
            <label>
              <input type="radio" name="draw" value="eraser"
                onChange={this.onDrawChange} />
              Eraser
            </label>
            <label>
              <input type="radio" name="draw" value="start"
                onChange={this.onDrawChange} />
              Start
            </label>
            <label>
              <input type="radio" name="draw" value="end"
                onChange={this.onDrawChange} />
              End
            </label>
          </div>
          <div>
            <label>Algorithm:</label>
            <label>
              <input type="radio" name="algo" value="dfs" checked={this.state.selectedAlgo === 'dfs'}
                onChange={this.onAlgoChange} />
              DFS
            </label>
            <label>
              <input type="radio" name="algo" value="bfs"
                onChange={this.onAlgoChange} />
              BFS
            </label>
            <label>
              <input type="radio" name="algo" value="dijkstra"
                onChange={this.onAlgoChange} />
              Dijkstra
            </label>
            <label>
              <input type="radio" name="algo" value="astar"
                onChange={this.onAlgoChange} />
             A*
           </label>
            {this.state.selectedAlgo === 'astar' && <span>
              &nbsp;
              &nbsp;
              Distance:
             <label>
                <input type="radio" name="also-astar-distance" value="euclidian" checked={this.state.astarDistance === 'euclidian'}
                  onChange={this.onAlgoAStarDistanceChange}
                ></input>
                Euclidian
              </label>
              <label>
                <input type="radio" name="also-astar-distance" value="manhattan"
                  onChange={this.onAlgoAStarDistanceChange}
                ></input>
                Manhattan
              </label>
              &nbsp;
              &nbsp;
              Heuristic:
             <label>
                <input type="radio" name="also-astar-heuristic" value="total" checked={this.state.astarHeuristic === 'total'}
                  onChange={this.onAlgoAStarHeuristicChange}
                ></input>
                Total distance
              </label>
              <label>
                <input type="radio" name="also-astar-heuristic" value="focused"
                  onChange={this.onAlgoAStarHeuristicChange}
                ></input>
                Focus on target
              </label>
            </span>}
          </div>
          <div>
            <button onClick={this.onStart}>Start</button>
            <button onClick={this.onClear}>Clear</button>
          </div>
          <div>
            <label>Result:</label>
            {this.state.result}
          </div>
        </div>
        <div
          className="panel"
          style={style}
          onClick={this.onClick}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseOut={this.onMouseOut}
        >
          <canvas ref={this.canvas} width="1000px" height="500px" id="canvas"></canvas>
        </div>
      </div>
    );
  }
}



class Node {
  id = 0;
  x = 0;
  y = 0;
  isWall = false;
  isVisited = false;
  isStart = false;
  isEnd = false;
  isPath = false;
  length = 0;
}






/*********************************************************************************
 * 
 * DFS ALGO
 */

class DfsAlgo {
  nodes = [];
  startNode = null;
  endNode = null;
  root = null;
  path = [];
  callback = null;

  constructor(nodes, startNode, endNode, callback) {
    this.nodes = nodes;
    this.startNode = startNode;
    this.endNode = endNode;
    this.callback = callback;
  }

  start() {
    this.root = new DfsNode(this.startNode.x, this.startNode.y);
    let result = this.search(this.root);
  }

  returnPath() {
    let nodes = [];
    this.path.forEach(dfsNode => {
      let node = this.nodes[dfsNode.y][dfsNode.x];
      nodes.push(node);
    });
    return nodes;
  }

  search(dfsNode, len = 0) {
    let node = this.nodes[dfsNode.y][dfsNode.x];
    node.isVisited = true;
    node.length = len;
    if (this.callback !== null) this.callback(node);

    if (node.isEnd === true) {
      this.path.push(dfsNode);
      return true;
    }

    let n = this.findNeighbours(node);
    n.forEach(node => {
      let newDfsNode = new DfsNode(node.x, node.y);
      dfsNode.addNode(newDfsNode, 1);
    })

    for (let i = 0; i < dfsNode.dfsNodes.length; i++) {
      let searchDfsNode = dfsNode.dfsNodes[i];
      let result = this.search(searchDfsNode.dfsNode, len + searchDfsNode.len);
      if (result === true) {
        this.path.push(dfsNode);
        return true;
      }
    }

    return false;
  }

  findNeighbours(node) {
    let n = [];
    let x = node.x;
    let y = node.y;

    // check left
    if (x > 0) {
      let node = this.nodes[y][x - 1];
      if (node.isWall == false && !node.isVisited)
        n.push(node);
    }

    // check down
    if (y < this.nodes.length - 1) {
      let node = this.nodes[y + 1][x];
      if (node.isWall == false && !node.isVisited)
        n.push(node);
    }

    // check right
    if (x < this.nodes[y].length - 1) {
      let node = this.nodes[y][x + 1];
      if (node.isWall == false && !node.isVisited)
        n.push(node);
    }

    // check up
    if (y > 0) {
      let node = this.nodes[y - 1][x];
      if (node.isWall == false && !node.isVisited)
        n.push(node);
    }

    return n;
  }
}


class DfsNode {
  dfsNodes = [];
  x = null;
  y = null;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  addNode(dfsNode, len) {
    this.dfsNodes.push({
      dfsNode: dfsNode,
      len: len
    });
  }
}


/*********************************************************************************
 * 
 * BFS ALGO
 */

class BfsAlgo {
  nodes = [];
  startNode = null;
  endNode = null;
  queue = [];
  root = null;
  path = [];
  callback = null;

  constructor(nodes, startNode, endNode, callback) {
    this.nodes = nodes;
    this.startNode = startNode;
    this.endNode = endNode;
    this.callback = callback;
  }

  start() {
    this.root = new BfsNode(null, this.startNode.x, this.startNode.y);
    this.search(this.root);
  }

  returnPath() {
    let nodes = [];
    if (this.path.length === 0) {
      this.endNode.length = 0;
      return nodes;
    }

    this.path.forEach(bfsNode => {
      let node = this.nodes[bfsNode.y][bfsNode.x];
      nodes.push(node);

      while (bfsNode.parent !== null) {
        bfsNode = bfsNode.parent;
        node = this.nodes[bfsNode.y][bfsNode.x];
        nodes.push(node);
      }
    });
    this.endNode.length = nodes.length;
    return nodes;
  }

  search(bfsNode, len = 0) {
    this.queue.push(bfsNode);
    let node = this.nodes[bfsNode.y][bfsNode.x];
    node.length = len;

    while (this.queue.length > 0) {

      for (let i = 0; i < this.queue.length; i++) {
        let currentBfsNode = this.queue.shift();
        let currentNode = this.nodes[currentBfsNode.y][currentBfsNode.x];
        currentNode.isVisited = true;
        if (this.callback !== null) this.callback(node);

        if (currentNode.isEnd === true) {
          this.path.push(currentBfsNode);
          return;
        }

        let n = this.findNeighbours(currentNode);
        n.forEach(node => {
          let newBfsNode = new BfsNode(currentBfsNode, node.x, node.y);
          if (!this.queue.find(bfsNode => bfsNode.x === newBfsNode.x && bfsNode.y === newBfsNode.y))
            this.queue.push(newBfsNode);
        });
      }
    }
  }

  findNeighbours(node) {
    let n = [];
    let x = node.x;
    let y = node.y;

    // check left
    if (x > 0) {
      let node = this.nodes[y][x - 1];
      if (node.isWall == false && !node.isVisited)
        n.push(node);
    }

    // check down
    if (y < this.nodes.length - 1) {
      let node = this.nodes[y + 1][x];
      if (node.isWall == false && !node.isVisited)
        n.push(node);
    }

    // check right
    if (x < this.nodes[y].length - 1) {
      let node = this.nodes[y][x + 1];
      if (node.isWall == false && !node.isVisited)
        n.push(node);
    }

    // check up
    if (y > 0) {
      let node = this.nodes[y - 1][x];
      if (node.isWall == false && !node.isVisited)
        n.push(node);
    }

    return n;
  }
}


class BfsNode {
  parent = null;
  x = null;
  y = null;

  constructor(parent, x, y) {
    this.x = x;
    this.y = y;
    this.parent = parent;
  }
}








/*********************************************************************************
 * 
 * Dijkstra ALGO
 */

class DijkstraAlgo {
  nodes = [];
  startNode = null;
  endNode = null;
  map = new Map();
  callback = null;

  constructor(nodes, startNode, endNode, callback) {
    this.nodes = nodes;
    this.startNode = startNode;
    this.endNode = endNode;
    this.callback = callback;
  }

  start() {
    this.mapSet(this.startNode.x, this.startNode.y, 0, null, false);
    let node = this.nodes[this.startNode.y][this.startNode.x];
    node.isVisited = true;

    while (true) {
      let currentNode = this.mapSearchMinDistanceNode();
      let currentVisualNode = this.nodes[currentNode.y][currentNode.x];
      this.mapSetVisited(currentNode);
      if (currentNode.x === this.endNode.x && currentNode.y === this.endNode.y) {
        return;
      }

      let n = this.findNeighbours(currentVisualNode);
      n.forEach(node => {
        let checkNode = this.mapGet(node.x, node.y);
        if (checkNode === null || (checkNode.visited === false && checkNode.distance > currentNode.distance + 1)) {
          this.mapSet(node.x, node.y, currentNode.distance + 1, currentNode, false);
        }
      });
    }
  }

  returnPath() {
    let nodes = [];
    let foundNode = this.mapGet(this.endNode.x, this.endNode.y);
    if (foundNode === null) {
      this.endNode.length = 0;
      return nodes;
    }

    //console.log(this.map);
    let currentNode = foundNode;
    while (currentNode !== null) {
      let visualNode = this.nodes[currentNode.y][currentNode.x];
      nodes.push(visualNode);
      currentNode = currentNode.previous;
    }
    this.endNode.length = foundNode.distance;
    return nodes;
  }

  getKey(x, y) {
    return `${x},${y}`;
  }

  mapSet(x, y, distance, previous, visited) {
    let key = this.getKey(x, y);
    let obj = {
      x: x,
      y: y,
      distance: distance,
      previous: previous,
      visited: visited
    };
    this.map.set(key, obj);
  }

  mapSetVisited(node) {
    let tempNode = this.mapGet(node.x, node.y);
    this.mapSet(node.x, node.y, tempNode.distance, tempNode.previous, true);

    let visualNode = this.nodes[node.y][node.x];
    visualNode.isVisited = true;
    if (this.callback !== null) this.callback(visualNode);
  }

  mapGet(x, y) {
    let key = this.getKey(x, y);
    let node = this.map.get(key);
    if (node === undefined) return null;
    return node;
  }

  mapSearchMinDistanceNode() {
    let min = Number.MAX_VALUE;
    let minKey = null;
    this.map.forEach((v, k) => {
      if (v.visited === false && v.distance < min) {
        min = v.distance;
        minKey = k;
      }
    });
    return this.map.get(minKey);
  }

  findNeighbours(node) {
    let n = [];
    let x = node.x;
    let y = node.y;

    // check left
    if (x > 0) {
      let node = this.nodes[y][x - 1];
      if (node.isWall == false)
        n.push(node);
    }

    // check down
    if (y < this.nodes.length - 1) {
      let node = this.nodes[y + 1][x];
      if (node.isWall == false)
        n.push(node);
    }

    // check right
    if (x < this.nodes[y].length - 1) {
      let node = this.nodes[y][x + 1];
      if (node.isWall == false)
        n.push(node);
    }

    // check up
    if (y > 0) {
      let node = this.nodes[y - 1][x];
      if (node.isWall == false)
        n.push(node);
    }

    return n;
  }
}















/*********************************************************************************
 * 
 * A* ALGO
 */

class AStarAlgo {
  nodes = [];
  startNode = null;
  endNode = null;
  map = new Map();
  callback = null;
  distanceMethod = null;
  heuristicMethod = null;

  constructor(nodes, startNode, endNode, callback, distanceMethod, heuristicMethod) {
    this.nodes = nodes;
    this.startNode = startNode;
    this.endNode = endNode;
    this.callback = callback;
    this.distanceMethod = distanceMethod;
    this.heuristicMethod = heuristicMethod;
  }

  start() {
    let heuristicDistance = this.getDistance(this.endNode.x, this.endNode.y, this.startNode.x, this.startNode.y);
    this.mapSet(this.startNode.x, this.startNode.y, 0, heuristicDistance, null, false);
    let node = this.nodes[this.startNode.y][this.startNode.x];
    node.isVisited = true;

    while (true) {
      let currentNode = this.mapSearchMinDistanceNode();
      let currentVisualNode = this.nodes[currentNode.y][currentNode.x];
      this.mapSetVisited(currentNode);
      if (currentNode.x === this.endNode.x && currentNode.y === this.endNode.y) {
        return;
      }

      let n = this.findNeighbours(currentVisualNode);
      n.forEach(node => {
        heuristicDistance = this.getDistance(this.endNode.x, this.endNode.y, node.x, node.y);
        this.mapSet(node.x, node.y, currentNode.distance + 1, heuristicDistance, currentNode, false);
      });
    }
  }

  returnPath() {
    let nodes = [];
    let foundNode = this.mapGet(this.endNode.x, this.endNode.y);
    if (foundNode === null) {
      this.endNode.length = 0;
      return nodes;
    }

    //console.log(this.map);
    let currentNode = foundNode;
    while (currentNode !== null) {
      let visualNode = this.nodes[currentNode.y][currentNode.x];
      nodes.push(visualNode);
      currentNode = currentNode.previous;
    }
    this.endNode.length = foundNode.distance;
    return nodes;
  }

  getKey(x, y) {
    return `${x},${y}`;
  }

  getDistance(x1, y1, x2, y2) {
    let distX = Math.abs(x1 - x2);
    let distY = Math.abs(y1 - y2);

    if (this.distanceMethod === 'euclidian')
      return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
    else
      return distX + distY;
  }

  mapSet(x, y, distance, heuristicDistance, previous, visited) {
    let key = this.getKey(x, y);
    let obj = {
      x: x,
      y: y,
      distance: distance,
      heuristicDistance: heuristicDistance,
      totalDistance: distance + heuristicDistance,
      previous: previous,
      visited: visited
    };
    let existingNode = this.mapGet(x, y);
    if (existingNode === null) {
      this.map.set(key, obj);
      return;
    }

    if (existingNode.isVisited === true)
      return;

    if (existingNode.score >= obj.score) {
      this.map.set(key, obj);
    }
  }

  mapSetVisited(node) {
    node.visited = true;
    let visualNode = this.nodes[node.y][node.x];
    visualNode.isVisited = true;
    if (this.callback !== null) this.callback(visualNode);
  }

  mapGet(x, y) {
    let key = this.getKey(x, y);
    let node = this.map.get(key);
    if (node === undefined) return null;
    return node;
  }

  mapSearchMinDistanceNode() {
    let min = Number.MAX_VALUE;
    let minKey = null;
    this.map.forEach((v, k) => {
      if (this.heuristicMethod === 'total') {
        if (v.visited === false && v.totalDistance < min) {
          min = v.totalDistance;
          minKey = k;
        }
      }
      else {
        if (v.visited === false && v.heuristicDistance < min) {
          min = v.heuristicDistance;
          minKey = k;
        }
      }
    });
    return this.map.get(minKey);
  }

  findNeighbours(node) {
    let n = [];
    let x = node.x;
    let y = node.y;

    // check left
    if (x > 0) {
      let node = this.nodes[y][x - 1];
      if (node.isWall == false)
        n.push(node);
    }

    // check down
    if (y < this.nodes.length - 1) {
      let node = this.nodes[y + 1][x];
      if (node.isWall == false)
        n.push(node);
    }

    // check right
    if (x < this.nodes[y].length - 1) {
      let node = this.nodes[y][x + 1];
      if (node.isWall == false)
        n.push(node);
    }

    // check up
    if (y > 0) {
      let node = this.nodes[y - 1][x];
      if (node.isWall == false)
        n.push(node);
    }

    return n;
  }
}

