"use strict";

// Selectors
const solveBtn = document.querySelector(".btn--solve");
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
  });

  clearBtn.addEventListener("click", clearBoard);
});
