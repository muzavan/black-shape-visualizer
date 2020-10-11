import React from 'react';
import './Island.css';

const blankColor = "#f2f2f2";
const modColor = {
  0: "#e29bf4",
  1: "#ffa351",
  2: "#81de76",
}

const textColor = "#111111";

function IslandBox(props){
  let bgColor = blankColor;

  if (props.box !== 0) {
    bgColor = modColor[props.box % 3];
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
