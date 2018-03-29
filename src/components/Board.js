import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const squares = Array(9)
      .fill(null)
      .map((value, index) => this.renderSquare(index));

    return (
      <main className="container-board-row">
        { squares }
      </main>
    );
  }
}

export default Board;