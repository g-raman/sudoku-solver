"use strict";

// Selectors
const solveBtn = document.querySelector(".btn--solve");
const checkBtn = document.querySelector(".btn--check");
const newBtn = document.querySelector(".btn--new");
const clearBtn = document.querySelector(".btn--clear");

// Main
document.addEventListener("DOMContentLoaded", function() {
  resetBoard();
  showValidInputOnly();

  solveBtn.addEventListener("click", function() {
    clearBoard();
    const board = boardToArray();
    solve(board);
    updateBoard(board);
    resetTimer();
  });

  checkBtn.addEventListener("click", function() {
    const board = boardToArray();
    const emptySpace = findEmptySpace(board);

    if (emptySpace !== null) {
      alert("Fill in the board first!");
    } else if (isValidSudoku(board)) {
      alert("Congratulations! You finished the puzzle!");
      stopTimer();
    } else alert("You have some errors. Keep trying!");
  });

  newBtn.addEventListener("click", showNewSudoku);

  clearBtn.addEventListener("click", clearBoard);
});
