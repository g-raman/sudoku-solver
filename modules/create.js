"use strict";

// Page specific methods
function showValidInputOnly() {
  const cells = document.querySelectorAll(".board__cell");

  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    const cell = cells[cellIndex];
    cell.addEventListener("keydown", function(event) {
      const keyPressed = parseInt(event.key);
      event.preventDefault();

      if (event.key === "Backspace" || event.key === "Delete") {
        cell.classList.remove("hint");
        cell.value = "";
      } else if (!isNaN(keyPressed) && keyPressed >= 1 && keyPressed <= 9) {
        cell.value = keyPressed;
        cell.classList.add("hint");
      }
    });
  }
}

// Selectors
const solveBtn = document.querySelector(".btn--solve");
const clearBtn = document.querySelector(".btn--clear");

// Main
document.addEventListener("DOMContentLoaded", function() {
  resetBoard();
  showValidInputOnly();

  solveBtn.addEventListener("click", function() {
    const board = boardToArray();
    solve(board);
    updateBoard(board);
  });

  clearBtn.addEventListener("click", resetBoard);
});
