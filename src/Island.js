import React from 'react';
import './Island.css';

const blankColor = "#ffffff";
const oddColor = "#ff0000";
const evenColor = "#00ff00";
const textColor = "#0000ff";

function IslandBox(props){
  let bgColor = evenColor;

  if (props.box === 0) {
    bgColor = blankColor;
  } else if (props.box % 2 === 1){
    bgColor = oddColor;
  }

  const style = {
    backgroundColor: bgColor,
    color: textColor,
  };

  return (
    <div className="IslandBox" style={style}>
      {props.box > 0 ? props.box : ''}
    </div>
  );
}

function IslandRow(props){
  const row = props.row;
  let boxes = [];
  for(const i in row){
    boxes.push(<IslandBox key={"island-box-" + i} box={row[i]}/>)
  };
  
  return (
    <div className="IslandRow">
      {boxes}
    </div>
  );
}

function Island(props){
  const arr = props.arr;
  let rows = [];
  for(const i in arr){
    rows.push(<IslandRow key={"island-row-" + i} row={arr[i]}/>)
  };
  
  return (
    <div className="Island">
      {rows}
    </div>
  );
}

export default Island;
