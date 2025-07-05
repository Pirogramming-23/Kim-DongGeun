const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const lapsList = document.getElementById('laps');

let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 0;

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function printTime() {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - elapsedTime;
        timerInterval = setInterval(printTime, 10);
        running = true;
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.add('active');
        lapResetBtn.textContent = 'Lap';
    } else {
        clearInterval(timerInterval);
        running = false;
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('active');
        lapResetBtn.textContent = 'Reset';
    }
}

function lapReset() {
    if (running) {
        // Lap
        lapCounter++;
        const lapTime = elapsedTime;
        const li = document.createElement('li');
        li.className = 'lap-item';
        li.innerHTML = `<span class="lap-number">Lap ${lapCounter}</span><span>${formatTime(lapTime)}</span>`;
        lapsList.prepend(li);
    } else {
        // Reset
        elapsedTime = 0;
        lapCounter = 0;
        display.textContent = '00:00.00';
        lapsList.innerHTML = '';
        lapResetBtn.textContent = 'Reset';
    }
}

startStopBtn.addEventListener('click', startStop);
lapResetBtn.addEventListener('click', lapReset);
