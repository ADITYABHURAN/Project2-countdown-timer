const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const timeInput = document.getElementById('timeInput');
const countdownDisplay = document.getElementById('countdownDisplay');

let timeValue = 0;
let intervalId = null;
let isPaused = false;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    timeValue = parseInt(timeInput.value);

    if (isNaN(timeValue)) {
        countdownDisplay.textContent = "Please enter a valid number";
        return;
    }
    if (timeValue <= 0) {
        countdownDisplay.textContent = "Please enter a positive number";
        return;
    }

    clearInterval(intervalId);
    isPaused = false;

    countdownDisplay.textContent = formatTime(timeValue);
    updateButtonStates('running');

    intervalId = setInterval(() => {
        if (!isPaused && timeValue > 0) {
            timeValue--;
            countdownDisplay.textContent = formatTime(timeValue);
        }

        if (timeValue <= 0) {
            clearInterval(intervalId);
            countdownDisplay.textContent = "Time's up!";
            updateButtonStates('done');
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    updateButtonStates('paused');
}

function resumeTimer() {
    if (isPaused && timeValue > 0) {
        isPaused = false;
        updateButtonStates('running');
    }
}

function updateButtonStates(state) {
    if (state === 'running') {
        startButton.disabled = true;
        pauseButton.disabled = false;
        resumeButton.disabled = true;
    } else if (state === 'paused') {
        startButton.disabled = true;
        pauseButton.disabled = true;
        resumeButton.disabled = false;
    } else if (state === 'done' || state === 'reset') {
        startButton.disabled = false;
        pauseButton.disabled = true;
        resumeButton.disabled = true;
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resumeButton.addEventListener('click', resumeTimer);

// Initialize button states
updateButtonStates('reset');
