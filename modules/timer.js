"use strict";

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
  disableBtn(timerElem);
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
