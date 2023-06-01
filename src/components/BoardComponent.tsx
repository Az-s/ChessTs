import React, { useState, useEffect } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const click = (cell: Cell) => {
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      updateBoard();
    } else {
      setSelectedCell(cell);
    }
 
  };

  useEffect(() => {
    highLightCells();
  }, [selectedCell]);
  

  const highLightCells = () => {
    board.highLightCells(selectedCell);
    updateBoard();
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  return (
    <div className="board">
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell) => (
            <CellComponent
              cell={cell}
              key={cell.id}
              selected={
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
              click={click}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
