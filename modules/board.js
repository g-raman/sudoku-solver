"use strict";

// Visuals
function clearBoard() {
  const cells = document.querySelectorAll(".board__cell");

  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    if (cells[cellIndex].disabled) continue;
    cells[cellIndex].value = "";
  }
}

function resetBoard() {
  const cells = document.querySelectorAll(".board__cell");

  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    cells[cellIndex].value = "";
    cells[cellIndex].disabled = false;
    cells[cellIndex].classList.remove("hint");
  }
}

function updateBoard(board) {
  const cells = document.querySelectorAll(".board__cell");

  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    const row = Math.floor(cellIndex / 9);
    const col = cellIndex % 9;

    cells[cellIndex].value = board[row][col];
  }
}

// Util
function boardToArray() {
  const cells = document.querySelectorAll(".board__cell");
  let arr = [[], [], [], [], [], [], [], [], []];

  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    const row = Math.floor(cellIndex / 9);
    const col = cellIndex % 9;

    arr[row][col] = cells[cellIndex].value;
  }

  return arr;
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

// Fetch data
const getBoards = fetch(
  "https://g-raman.github.io/sudoku-solver/sudoku.json"
).then((response) => response.json());

const showNewSudoku = async () => {
  const boards = await getBoards;
  const randomBoard = Math.floor(Math.random() * 2000);

  resetBoard();
  resetTimer();

  const cells = document.querySelectorAll(".board__cell");
  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    const row = Math.floor(cellIndex / 9);
    const col = cellIndex % 9;

    if (boards[randomBoard][row][col] !== "") {
      cells[cellIndex].classList.add("hint");
      cells[cellIndex].disabled = true;
    }

    cells[cellIndex].value = boards[randomBoard][row][col];
  }

  startTimer();
};

