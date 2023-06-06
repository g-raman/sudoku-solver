"use strict";

function boardToArray() {
  const board = document.querySelectorAll(".board__cell");
  let arr = [[], [], [], [], [], [], [], [], []];

  for (let cellIndex = 0; cellIndex < board.length; cellIndex++) {
    const row = Math.floor(cellIndex / 9);
    const col = cellIndex % 9;

    arr[row][col] = board[cellIndex].value;
  }

  return arr;
}

function findEmptySpace(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === "") return [row, col];
    }
  }

  return null;
}

function clearBoard() {
  const board = document.querySelectorAll(".board__cell");

  for (let cellIndex = 0; cellIndex < board.length; cellIndex++) {
    board[cellIndex].value = "";
  }
}

function isValidSudoku(board) {
  let rows = new Set();
  let cols = new Set();
  let boxes = new Set();

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      let currNum = board[row][col];

      if (currNum === "") continue;

      let rowLocation = `${currNum} in row ${row}`;
      let colLocation = `${currNum} in col ${col}`;
      let boxLocation = `${currNum} in box ${Math.floor(row / 3)} ${Math.floor(
        col / 3
      )}`;

      if (
        rows.has(rowLocation) ||
        cols.has(colLocation) ||
        boxes.has(boxLocation)
      ) {
        return false;
      }

      rows.add(rowLocation);
      cols.add(colLocation);
      boxes.add(boxLocation);
    }
  }
  return true;
}
