import React, { Component } from 'react';
import Board from './Board';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = [...lines[i]];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] === 'X' ? 'Player 1' : 'Player 2';
    }
  }
  return null;
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: [...history, { squares: squares }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = [...this.state.history];
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Back to #${move} move` :
        'Restart game';
      return (
        <li className="game-info-move-list" key={move}>
          <div className="game-info-move" onClick={() => this.jumpTo(move)}>{desc}</div>
        </li>
      );
    });

    const status = winner ?
      `${winner} wins` :
      `It's ${this.state.xIsNext ? 'Player 1' : 'Player 2'}'s turn`;

    return (
      <section className="game">
        <section className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </section>
        <section className="game-info">
          <header className="game-info-status-container">
            <p className="game-info-status">{status}</p>
          </header>
          <aside className="game-info-history-container">
            <ul className="game-info-list">{moves}</ul>
          </aside>
        </section>
      </section>
    );
  }
}

export default Game;