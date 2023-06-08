"use strict";

// Page specific methods
function showValidInputOnly() {
  const cells = document.querySelectorAll(".board__cell");

  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    cells[cellIndex].addEventListener("keydown", function(event) {
      const keyPressed = parseInt(event.key);
      event.preventDefault();

      if (event.key === "Backspace" || event.key === "Delete") {
        cells[cellIndex].classList.remove("hint");
        cells[cellIndex].value = "";
      } else if (!isNaN(keyPressed) && keyPressed >= 1 && keyPressed <= 9) {
        cells[cellIndex].value = keyPressed;
      }
    });
  }
}

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