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
const typicalExample = document.querySelector(".example");
const invalidExample = document.querySelector(".invalid");
const unsolvableExample = document.querySelector(".unsolvable");

// Examples
const exampleBoard = [
  ["5", "3", "", "", "7", "", "", "", ""],
  ["6", "", "", "1", "9", "5", "", "", ""],
  ["", "9", "8", "", "", "", "", "6", ""],
  ["8", "", "", "", "6", "", "", "", "3"],
  ["4", "", "", "8", "", "3", "", "", "1"],
  ["7", "", "", "", "2", "", "", "", "6"],
  ["", "6", "", "", "", "", "2", "8", ""],
  ["", "", "", "4", "1", "9", "", "", "5"],
  ["", "", "", "", "8", "", "", "7", "9"],
];

const invalidBoard = [
  ["1", "1", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];

const unsolvableBoard = [
  ["1", "2", "3", "4", "5", "6", "7", "", "9"],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "8", ""],
];

typicalExample.addEventListener("click", function() {
  updateBoard(exampleBoard);
});

invalidExample.addEventListener("click", function() {
  updateBoard(invalidBoard);
});

unsolvableExample.addEventListener("click", function() {
  updateBoard(unsolvableBoard);
});

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
