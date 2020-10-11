import React from 'react';
import Island from './Island.js';
import {FaStar, FaQuestion} from 'react-icons/fa';

import './App.css';

const taHeight = 200;
const taWidth = 400;
const taStyle = {
  height: taHeight+"px",
  width: taWidth+"px",
};

const btnHelpWidth = 30;
const btnHelpStyle = {
  width: btnHelpWidth+"px",
};

const btnVisualizeWidth = taWidth - btnHelpWidth;
const btnVisualizeStyle = {
  width: btnVisualizeWidth + "px",
};

const starColor = "#ffd27d";

const defaultText = `6
XX00XX
XX00XX
XX00XX
XX00XX
XX00XX
XX00XX`;

const toolTipText = `Input Format:
[1st line: number of rows]
[2nd line: string representation, 'X' means land/black]
...
[N+1 line: string representation]

Example:
6
XX00XX
XX00XX
XX00XX
00XX00
00XX00
00XX00
`;

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
      helpVisible: false,
    };
  }

  toggleHelp(){
    this.setState({
      ...this.state,
      helpVisible: !this.state.helpVisible,
    });
  }
  
  changeColor(){
    const newVal = document.getElementById("island-ta").value;
    const vals = newVal.split(/\s+/);

    if (vals.length === 0 || isNaN(vals[0])){
      this.setState({
        ...this.state,
        helpVisible: true,
      });
      return;
    } 

    let rowNum = +vals[0];
    if (rowNum === 0 || vals.length === 1){
      this.setState({
        ...this.state,
        helpVisible: true,
      });
      return;
    }

    let colNum = vals[1].length;

    // Initialization
    let arr = [];
    for (let i = 0; i < rowNum; i++){
      const curr = Array.from('0'.repeat(colNum)).map(v => +v);
      arr.push(curr);
    }
    
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
      ...this.state,
      islands: arr,
    });
  }

  render(){
    let toolTip = "";
    if (this.state.helpVisible){
      toolTip = (
        <div>
            <pre>
            {toolTipText}
            </pre>
        </div>
      );
    }
    return (
      <div className="App">
        <h3>Black Shape Visualizer</h3>
        <p>This visualization will help you count number of element group in a grid.</p>
        Relevant questions:
          <p> <a href="https://www.interviewbit.com/problems/black-shapes/">Black Shape</a> on InterviewBit</p>
          <p> <a href="https://leetcode.com/problems/number-of-islands/">Number of Islands</a> on LeetCode</p>
        <div className="ta">
          <textarea id="island-ta" defaultValue={defaultText} style={taStyle}>
          </textarea>
          <div>
          <button className="btn visualize-btn" style={btnVisualizeStyle} onClick={() => this.changeColor()}>
            Visualize!
          </button>
          <button className="btn help-btn" style={btnHelpStyle} onClick={() => this.toggleHelp()}>
            <FaQuestion size={14} />
          </button>
          <p className="like">
            Do you think this helps you? Please consider to <FaStar color={starColor} /> <a href="https://github.com/muzavan/black-shape-visualizer">my repo</a> to let me know!
          </p>
          </div>
          {toolTip}
        </div>
        
        <Island arr={this.state.islands} />
      </div>
    );
  }
}

export default App;
