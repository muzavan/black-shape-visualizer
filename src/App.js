import React from 'react';
import Island from './Island.js';

import './App.css';

const taHeight = 500;
const taWidth = 300;
const taStyle = {
  height: taHeight+"px",
  width: taWidth+"px",
};

const defaultText = `6
XX00XX
XX00XX
XX00XX
XX00XX
XX00XX
XX00XX`;

//solveIsland will map each box to its particular island group
function solveIsland(arr){
  const rowNum = arr.length;
  if (rowNum === 0){
    return [];
  }

  const colNum = arr[0].length;
  let finalIsland = [];

  for(let i = 0; i < rowNum; i++){
    const curr = Array.from('0'.repeat(colNum)).map(v => +v);
    finalIsland.push(curr);
  }

  // DFS to Evaluate All Connected Island
  let cnt = 0;
  let stack = [];
  for(let i=0; i<rowNum; i++){
    for (let j=0; j<colNum; j++){
      // row, column, flag (island group, 0 means unset)
      stack.push([i, j, 0]);
    }
  }

  while(stack.length > 0 ){
    let [r, c, flag] = stack.pop();

    // Not an Island
    if (arr[r][c] !== 1){
      continue;
    }

    // Has been set
    if (finalIsland[r][c] !== 0){
      continue;
    }

    if (flag === 0){
      // New Island Group!
      flag = ++cnt;
    }

    finalIsland[r][c] = flag;

    // Add neighbors island
    if (r > 0){
      stack.push([r-1, c, flag]);
    }
    if (c > 0){
      stack.push([r, c-1, flag]);
    }
    if (r+1 < rowNum){
      stack.push([r+1, c, flag]);
    }
    if (c+1 < colNum){
      stack.push([r, c+1, flag]);
    }
  }

  return finalIsland;
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      islands: [],
    };
  }

  changeColor(){
    const newVal = document.getElementById("island-ta").value;
    const vals = newVal.split('\n');

    if (vals.length === 0 || isNaN(vals[0])){
      return;
    } 

    let rowNum = +vals[0];
    if (rowNum === 0 || vals.length === 1){
      return;
    }

    let colNum = vals[1].length;
    console.log("colNum", vals[1].length);

    // Initialization
    let arr = [];
    for (let i = 0; i < rowNum; i++){
      const curr = Array.from('0'.repeat(colNum)).map(v => +v);
      arr.push(curr);
    }
    
    console.log("vals", vals);
    // Insert actual number
    for(let i = 0; i < rowNum; i++){
      const row = (i + 1) < vals.length ? vals[i+1] : "";
      
      let j = 0;

      while(j < row.length && j < colNum){
        if (row[j] === 'X'){
          arr[i][j] = 1;
        }

        j++;
      }
    }

    arr = solveIsland(arr);
    this.setState({
      islands: arr,
    });
  }

  render(){
    return (
      <div className="App">
        <textarea id="island-ta" defaultValue={defaultText} style={taStyle}>
        </textarea>
        <button onClick={() => this.changeColor()}>
          Click Me!
        </button>

        <Island arr={this.state.islands} />
      </div>
    );
  }
}

export default App;
