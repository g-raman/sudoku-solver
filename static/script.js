class Sudoku {
  constructor(board) {
    this.board = board;
    this.SIZE = 9;
  }

  // Checks if all rows, columns, and sub-grids have unique values
  isValidSudoku() {
    let rows = new Set();
    let cols = new Set();
    let boxes = new Set();

    for (let row = 0; row < this.SIZE; row++) {
      for (let col = 0; col < this.SIZE; col++) {
        let currNum = this.board[row][col];

        // Notes down the location of the number realtive to it's row, column, and sub-grid
        if (currNum != "") {
          let rowLocation = `${currNum} in row ${row}`;
          let colLocation = `${currNum} in col ${col}`;
          let boxLocation = `${currNum} in box ${Math.floor(
            row / 3
          )}, ${Math.floor(col / 3)}`;

          // Checks if number already exists in row, col, or sub-grid
          if (
            rows.has(rowLocation) ||
            cols.has(colLocation) ||
            boxes.has(boxLocation)
          ) {
            return false;
          }

          // Stores location of number
          rows.add(rowLocation);
          cols.add(colLocation);
          boxes.add(boxLocation);
        }
      }
    }
    return true;
  }

  // Finds an empty space on the board
  findEmptySpace() {
    for (let row = 0; row < this.SIZE; row++) {
      for (let col = 0; col < this.SIZE; col++) {
        if (this.board[row][col] === "") return [row, col];
      }
    }
    return null;
  }

  // Checks if move results in a valid board
  isValidMove(row, col, num) {
    // Checks for duplicates in each row
    for (let x = 0; x < this.SIZE; x++) {
      if (this.board[x][col] === num) return false;
    }

    // Checks for duplicates in each column
    for (let y = 0; y < this.SIZE; y++) {
      if (this.board[row][y] === num) return false;
    }

    // Checks for duplicates in each sub-grid
    let startX = Math.floor(row / 3) * 3;
    let startY = Math.floor(col / 3) * 3;

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this.board[startX + x][startY + y] === num) return false;
      }
    }
    return true;
  }

  // Recursively solves each empty cell and backtracks if board becomes unsolvable
  solveSudoku() {
    let found = this.findEmptySpace();

    // Base case: Board has been solved and there are no empty spaces
    if (found === null) {
      return true;
    }
    let row = found[0];
    let col = found[1];

    // Goes through all possible moves
    for (let num = 1; num < this.SIZE + 1; num++) {
      if (this.isValidMove(row, col, num) === true) {
        this.board[row][col] = num;

        // Solves the next cell
        if (this.solveSudoku()) {
          return true;
        }

        // Resets the cell value if the move was wrong
        this.board[row][col] = "";
      }
    }
    return false;
  }
}

// Checks if an HTML element exists in the DOM
function elementExists(elementId) {
  let element = document.querySelector(elementId);

  if (typeof element != "undefined" && element != null) {
    return true;
  }
  return false;
}

// Timer for sudoku
let secs = 0;
let mins = 0;
let hrs = 0;

// Ticks every second and updates timer
function timer() {
  let displaySecs = 0;
  let displayMins = 0;
  let displayHrs = 0;

  secs++;
  if (secs / 60 === 1) {
    secs = 0;
    mins++;

    if (mins / 60 === 1) {
      mins = 0;
      hrs++;
    }
  }

  if (secs < 10) {
    displaySecs = `0${secs}`;
  } else {
    displaySecs = secs;
  }

  if (mins < 10) {
    displayMins = `0${mins}`;
  } else {
    displayMins = mins;
  }

  if (hrs < 10) {
    displayHrs = `0${hrs}`;
  } else {
    displayHrs = hrs;
  }

  document.querySelector(
    "#timer"
  ).innerHTML = `${displayHrs}:${displayMins}:${displaySecs}`;
}

function startTimer() {
  window.interval = window.setInterval(timer, 1000);
}

function stopTimer() {
  window.clearInterval(window.interval);
}

function resetTimer() {
  window.clearInterval(window.interval);
  secs = 0;
  mins = 0;
  hrs = 0;
  document.querySelector("#timer").innerHTML = "00:00:00";
}

// Converts the values inside input elements on the sudoku board to a 2D array
function boardToArray() {
  let cells = document.querySelectorAll(".cell");
  let board = [[], [], [], [], [], [], [], [], []];
  let cellCount = cells.length;

  for (let cell = 0; cell < cellCount; cell++) {
    let row = Math.floor(cell / 9);
    let col = cell % 9;

    board[row][col] = cells[cell].value;
  }
  return board;
}

// Updates sudoku board with new values
function updateBoard(boardArray) {
  let cells = document.querySelectorAll(".cell");
  let cellCount = cells.length;

  for (let cell = 0; cell < cellCount; cell++) {
    let row = Math.floor(cell / 9);
    let col = cell % 9;

    cells[cell].value = boardArray[row][col];
  }
}

// Shows the user a new sudoku board to play
function displayNewSudoku(boardArray) {
  let cells = document.querySelectorAll(".cell");
  let cellCount = cells.length;

  for (let cell = 0; cell < cellCount; cell++) {
    let row = Math.floor(cell / 9);
    let col = cell % 9;

    // Disables input elements that are sudoku hints
    if (boardArray[row][col] != "") {
      cells[cell].classList.add("sudoku-hint");
      cells[cell].disabled = true;
    }
    cells[cell].value = boardArray[row][col];
  }
}

// Clears the values in the sudoku board
function clearBoard(wipeBoard = false) {
  let cells = document.querySelectorAll(".cell");
  let cellCount = cells.length;

  // Resets all cells and removes all CSS classes
  if (wipeBoard === true) {
    for (let cell = 0; cell < cellCount; cell++) {
      cells[cell].value = "";
      cells[cell].classList.remove("sudoku-hint");
      cells[cell].disabled = false;
    }
  }
  // Only clears non-disabled cells
  else {
    for (let cell = 0; cell < cellCount; cell++) {
      if (cells[cell].disabled === false) {
        cells[cell].value = "";
        cells[cell].classList.remove("sudoku-hint");
      }
    }
  }
}

// Shows the answer to the sudoku board
function showSolution() {
  // Disables check and clear button if the user is playing a game
  let boardArray;
  if (elementExists("#timer")) {
    resetTimer();
    document.querySelector("#check").disabled = true;
    document.querySelector("#clear").disabled = true;
    boardArray = window.processedSudoku;
  } else {
    boardArray = boardToArray();
  }

  // Solves sudoku and alerts the user if it's invalid or unsolvable
  let sudoku = new Sudoku(boardArray);

  if (sudoku.isValidSudoku() === true) {
    if (sudoku.solveSudoku() === true) {
      updateBoard(boardArray);
    } else {
      alert("Sudoku not solvable");
    }
  } else {
    alert("Invalid sudoku board");
  }
}

// List of boards that the user has already cycled through
window.shownBoards = [];

// Accesss database of sudoku puzzles and displays a new, random one to user
function getNewSudoku() {
  resetTimer();
  clearBoard(true);
  document.querySelector("#check").disabled = false;
  document.querySelector("#clear").disabled = false;

  // Gets csv file with sudoku boards
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "static/sudoku.csv", true);
  xhr.onload = function () {
    if (this.status === 200) {
      let response = xhr.responseText;
      let processed = response.split("\n");

      // Chooses a sudoku board that has not been chosen
      while (true) {
        var index = Math.floor(Math.random() * (processed.length - 2)) + 1;

        if (window.shownBoards.includes(index) === false) {
          window.shownBoards.push(index);
          break;
        }
      }

      // Parses sudoku csv and converts the board and solution to a 2D array
      let newSudoku = processed[index].split(",")[0];
      let sudokuSolution = processed[index].split(",")[1];

      window.processedSudoku = processStrSudoku(newSudoku);
      window.processedSolution = processStrSudoku(sudokuSolution);
      displayNewSudoku(window.processedSudoku);
    }
  };
  xhr.send();
  startTimer();
}

// Converts a sudoku string to a 2D array
function processStrSudoku(strSudoku) {
  let processed = [[], [], [], [], [], [], [], [], []];
  let cellCount = 81;

  for (let num = 0; num < cellCount; num++) {
    let row = Math.floor(num / 9);
    let col = num % 9;

    if (Number(strSudoku[num] != 0)) {
      processed[row][col] = strSudoku[num];
    } else {
      processed[row][col] = "";
    }
  }
  return processed;
}

// Checks users answers
function checkSolution() {
  let board = boardToArray();
  let sudoku = new Sudoku(board);

  let found = sudoku.findEmptySpace();

  if (found === null) {
    for (let row = 0; row < sudoku.SIZE; row++) {
      for (let col = 0; col < sudoku.SIZE; col++) {
        if (board[row][col] != window.processedSolution[row][col]) {
          alert("Keep trying, you've placed some number incorrectly");
          return;
        }
      }
    }
  } else {
    alert("Fill in all cells to check answer");
    return;
  }
  alert("Conratulations! You solved the sudoku");
}

// Adds black border and black dividers to the board
function stylizeBoard() {
  let cells = document.querySelectorAll(".cell");
  const SIZE = 9;

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (row === 0) {
        cells[col].classList.add("top-edge");
      }
      if (col === 0) {
        cells[row * 9].classList.add("left-edge");
      }

      if (row % 3 === 2) {
        cells[row * 9 + col].classList.add("row-divider");
      }
      if (col % 3 === 2) {
        cells[row * 9 + col].classList.add("col-divider");
      }
    }
  }

  cells[0].classList.add("tl-corner");
  cells[8].classList.add("tr-corner");
  cells[72].classList.add("bl-corner");
  cells[80].classList.add("br-corner");
}

// Only show numeric input and add CSS classes
function showInput() {
  let cells = document.querySelectorAll(".cell");
  let cellCount = cells.length;

  for (let cell = 0; cell < cellCount; cell++) {
    cells[cell].addEventListener("keydown", function (event) {
      let keyPressed = parseInt(event.key);

      if (event.key === "Backspace" || event.key === "Delete") {
        cells[cell].classList.remove("sudoku-hint");
        cells[cell].value = "";
      } else if (!isNaN(keyPressed) && keyPressed >= 1 && keyPressed <= 9) {
        cells[cell].value = keyPressed;
        if (elementExists("#timer") === false) {
          cells[cell].classList.add("sudoku-hint");
        }
      } else {
        event.preventDefault();
      }
    });
  }
}

// Example boards for user to see
function prepareExamples() {
  const exampleBoard = [
    [5, 3, "", "", 7, "", "", "", ""],
    [6, "", "", 1, 9, 5, "", "", ""],
    ["", 9, 8, "", "", "", "", 6, ""],
    [8, "", "", "", 6, "", "", "", 3],
    [4, "", "", 8, "", 3, "", "", 1],
    [7, "", "", "", 2, "", "", "", 6],
    ["", 6, "", "", "", "", 2, 8, ""],
    ["", "", "", 4, 1, 9, "", "", 5],
    ["", "", "", "", 8, "", "", 7, 9],
  ];

  const invalidBoard = [
    [1, 1, "", "", "", "", "", "", ""],
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
    [1, 2, 3, 4, 5, 6, 7, "", 9],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", 8, ""],
  ];

  let basicExampleBtn = document.querySelector("#example");
  basicExampleBtn.addEventListener("click", function () {
    clearBoard();
    updateBoard(exampleBoard);
  });

  let invalidExampleBtn = document.querySelector("#invalid");
  invalidExampleBtn.addEventListener("click", function () {
    clearBoard();
    updateBoard(invalidBoard);
  });

  let unsolvableExampleBtn = document.querySelector("#unsolvable");
  unsolvableExampleBtn.addEventListener("click", function () {
    clearBoard();
    updateBoard(unsolvableBoard);
  });
}

// Adds event listeners to buttons
document.addEventListener("DOMContentLoaded", function () {
  if (elementExists("#timer")) {
    getNewSudoku();
  }

  stylizeBoard();

  showInput();

  let solveBtn = document.querySelector("#solve");
  solveBtn.addEventListener("click", showSolution);

  let clearBtn = document.querySelector("#clear");
  clearBtn.addEventListener("click", clearBoard);

  if (elementExists("#new")) {
    let newBtn = document.querySelector("#new");
    newBtn.addEventListener("click", getNewSudoku);
  }

  if (elementExists("#check")) {
    let checkBtn = document.querySelector("#check");
    checkBtn.addEventListener("click", checkSolution);
  }

  if (elementExists("#invalid")) {
    prepareExamples();
  }
});
