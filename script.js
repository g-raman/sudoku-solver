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
