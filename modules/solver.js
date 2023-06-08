"use strict";

// Sudoku solving algorithm
function findEmptySpace(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === "") return [row, col];
    }
  }

  return null;
}

function isValidMove(row, col, num, board) {
  // Check for duplicates along the column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check for duplicate along the row
  for (let y = 0; y < 9; y++) {
    if (board[row][y] === num) return false;
  }

  // Check for duplicates in box
  let boxStartX = Math.floor(row / 3) * 3;
  let boxStartY = Math.floor(col / 3) * 3;

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (board[boxStartX + x][boxStartY + y] === num) return false;
    }
  }

  return true;
}

function solve(board) {
  const emptyCell = findEmptySpace(board);

  if (emptyCell === null) return true;

  let row, col;
  [row, col] = emptyCell;

  for (let option = 1; option < 10; option++) {
    const strOption = option.toString();
    if (isValidMove(row, col, strOption, board)) {
      board[row][col] = strOption;

      if (solve(board)) return true;

      board[row][col] = "";
    }
  }
  return false;
}
