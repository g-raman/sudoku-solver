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

// Timer
let secs, mins, hours;
secs = mins = hours = 0;
let displaySecs, displayMins, displayHours, timerInterval;
const timerElem = document.querySelector(".btn--timer");

function timer() {
  secs++;
  if (secs / 60 === 1) {
    secs = 0;
    mins++;

    if (mins / 60 === 1) {
      mins = 0;
      hours++;
    }
  }

  displaySecs = secs < 10 ? `0${secs}` : secs;
  displayMins = mins < 10 ? `0${mins}` : mins;
  displayHours = hours < 10 ? `0${hours}` : hours;

  let time = `${displayHours}:${displayMins}:${displaySecs}`;

  timerElem.innerHTML = time;
}

timerElem.addEventListener("click", () => {
  showNewSudoku();
  startTimer();
  timerElem.disabled = true;
});

function startTimer() {
  timerInterval = setInterval(timer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  secs = mins = hours = 0;
  timerElem.innerHTML = "00:00:00"; 
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

// Selectors
const solveBtn = document.querySelector(".btn--solve");
const checkBtn = document.querySelector(".btn--check");
const newBtn = document.querySelector(".btn--new");
const clearBtn = document.querySelector(".btn--clear");

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
