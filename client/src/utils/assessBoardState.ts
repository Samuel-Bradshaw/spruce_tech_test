import { BoardGrid, BoardState, XorO } from '../types';

export const assessBoardState = (board: BoardGrid): BoardState => {
  const size = board.length;
  let winner: XorO | undefined = undefined;

  // Check Rows
  for (const row of board) {
    const val = row[0];
    if (val && row.every((cell) => cell === val)) {
      winner = val;
    }
  }

  //Check Cols
  for (let col = 0; col < size; col++) {
    const val = board[0][col];
    if (val && board.every((row) => row[col] === val)) {
      winner = val;
    }
  }

  //Check Diagonal
  const downDiagVal = board[0][0];
  if (downDiagVal && board.every((row, i) => row[i] === downDiagVal)) {
    winner = downDiagVal;
  }

  //Check Other Diagonal
  const upDiagVal = board[0][size - 1];
  if (upDiagVal && board.every((row, i) => row[size - 1 - i] === upDiagVal)) {
    winner = upDiagVal;
  }

  if (winner === 'O') return BoardState.OWin;
  else if (winner === 'X') return BoardState.XWin;
  else if (
    winner === undefined &&
    board.flat().every((cell) => cell !== undefined)
  ) {
    return BoardState.Draw;
  }
  return BoardState.InProgress;
};
