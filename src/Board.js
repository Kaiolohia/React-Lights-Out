import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    let row = []
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      for (let x = 0; x < ncols; x++) {
        let isLit = Math.floor(Math.random() * 2) === 1 ? true : false 
        row.push(isLit)
      }
      initialBoard.push(row)
      row = []
    }
    return initialBoard;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCells = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }

        //down
        if(x >= 0 && x < ncols && y+1 >= 0 && y+1 < nrows) {
          boardCopy[y+1][x] = !boardCopy[y+1][x]
        }
        //up
        if(x >= 0 && x < ncols && y-1 >= 0 && y-1 < nrows) {
          boardCopy[y-1][x] = !boardCopy[y-1][x]
        }
        //right
        if(x+1 >= 0 && x+1 < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x+1] = !boardCopy[y][x+1]
        }
        //left
        if(x-1 >= 0 && x-1 < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x-1] = !boardCopy[y][x-1]
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy = oldBoard.map(r => r.slice())
      // TODO: in the copy, flip this cell and the cells around it
      flipCells(y, x, boardCopy)
      // TODO: return the copy
      return boardCopy
    });
  }

  
  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  if(hasWon()) {
    return (
      <div>You won!</div>
    )
  }

  let tbl = () => {
    let htmlBoard = []
    for (let y = 0; y < nrows; y++) {
      let row = []
      for (let x = 0; x < ncols; x++) {
        row.push(<Cell key={`${y}-${x}`} isLit={board[y][x]} flipCellsAroundMe={ () => flipCellsAround(`${y}-${x}`)}/>)
      }
      htmlBoard.push(<tr key={y}>{row}</tr>)
      
    }
    return htmlBoard
  }
  return (
    <div>
      <table className="Board">
        <tbody>
          {tbl()}
        </tbody>
      </table>
    </div>
  )
}

export default Board;
