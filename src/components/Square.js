import React from 'react';

const Square = (props) => {
  return (
    <div className="square" onClick={props.onClick}>
      <p className="square-value">{props.value}</p>
    </div>
  );
}

export default Square;