const startbutton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton'); 
const resumeButton = document.getElementById('resumeButton'); 
const TimeInput = document.getElementById('timeInput');
const countdownDisplay = document.getElementById('countdownDisplay');

let timeValue = 0;
let intervalId = null;
let isPaused = false;

function startTimer() {
    timeValue = parseInt(TimeInput.value);

    if (isNaN(timeValue)) {
        countdownDisplay.textContent = "Please enter a valid number";
        return;
    }
    if (timeValue <= 0) {
        countdownDisplay.textContent = "Please enter a positive number";
        return;
    }

    countdownDisplay.textContent = timeValue + " seconds remaining";
    clearInterval(intervalId); // Clear any previous interval

    intervalId = setInterval(() => {
        if (!isPaused) {
            timeValue--;
            if (timeValue > 0) {
                countdownDisplay.textContent = timeValue + " seconds remaining";
            } else {
                countdownDisplay.textContent = "Time's up!";
                clearInterval(intervalId);
            }
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
}

function resumeTimer() {
    if (isPaused && timeValue > 0) {
        isPaused = false;
    }
}

startbutton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resumeButton.addEventListener('click', resumeTimer);