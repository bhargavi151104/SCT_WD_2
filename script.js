let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps");

function updateDisplay() {
    const time = Date.now() - startTime + elapsedTime;

    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / 60000) % 60);
    let hours = Math.floor(time / 3600000);

    display.textContent =
        `${String(hours).padStart(2, '0')}:` +
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}.` +
        `${String(milliseconds).padStart(2, '0')}`;
}

function startPause() {
    if (!running) {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
        startBtn.textContent = "Pause";
    } else {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        running = false;
        startBtn.textContent = "Start";
    }
}

startBtn.addEventListener("click", startPause);

lapBtn.addEventListener("click", () => {
    if (running) {
        const li = document.createElement("li");
        li.textContent = display.textContent;
        laps.prepend(li);

        localStorage.setItem("laps", laps.innerHTML);
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);

    running = false;
    startTime = 0;
    elapsedTime = 0;

    display.textContent = "00:00:00.00";
    startBtn.textContent = "Start";

    laps.innerHTML = "";
    localStorage.removeItem("laps");
});

window.onload = () => {
    laps.innerHTML = localStorage.getItem("laps") || "";
};

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {
        e.preventDefault();
        startPause();
    }

    if (e.key.toLowerCase() === "l") {
        lapBtn.click();
    }

    if (e.key.toLowerCase() === "r") {
        resetBtn.click();
    }
});