const buttons = document.querySelectorAll("button");
const hoursDisplay = document.querySelector("#hours");
const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");
const cycleCounter = document.querySelector("#cycleCounter");
const startBtn = document.querySelector("#startBtn")
let hours = 0;
let minutes = 0;
let seconds = 5;
let cycle = 0;
let isRunning = false;







hoursDisplay.innerHTML = hours;
minutesDisplay.innerHTML = minutes;
secondsDisplay.innerHTML = seconds;
cycleCounter.innerText = cycle;

let secondsIntervalId;

function startCounting() {
  if (isRunning) {
    secondsIntervalId = setInterval(() => {
      seconds -= 1;
      if (seconds < 0) {
        seconds = 59;
        minutes -= 1;
      }
      if (minutes < 0) {
        minutes = 59;
        hours -= 1;
      }
      if (hours === 0 && minutes === 0 && seconds < 1) {
        isRunning = false
        startBtn.classList.remove("start")
        startBtn.innerText = "Start Timer"
        cycle += 1
        cycleCounter.innerText = cycle;
        hours = 0;
        minutes = 0;
        seconds = 0;
        clearInterval(secondsIntervalId);
      }
      console.log(seconds);
      secondsDisplay.innerHTML = seconds;
      minutesDisplay.innerHTML = minutes;
      hoursDisplay.innerHTML = hours;
    }, 1000);
  } else {
    isRunning = false
    clearInterval(secondsIntervalId);
  }
}

buttons.forEach((button) => {
  hoursDisplay.innerHTML = hours;
  button.addEventListener("click", () => {
    switch (button.value) {
      case "addHours":
        hours += 1;
        if (hours > 99) {
          hours = 0;
        }
        hoursDisplay.innerHTML = hours;
        break;
      case "substractHours":
        hours -= 1;
        if (hours < 0) {
          hours = 99;
        }
        hoursDisplay.innerHTML = hours;
        break;
      case "addMinutes":
        minutes += 1;
        if (minutes > 59) {
          minutes = 0;
        }
        minutesDisplay.innerHTML = minutes;
        break;
      case "substractMinutes":
        minutes -= 1;
        if (minutes < 0) {
          minutes = 59;
        }
        minutesDisplay.innerHTML = minutes;

        break;
      case "addSeconds":
        seconds += 1;
        if (seconds > 59) {
          seconds = 0;
        }
        secondsDisplay.innerHTML = seconds;
        break;
      case "substractSeconds":
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
        }
        secondsDisplay.innerHTML = seconds;
        break;
      case "start":
        isRunning = !isRunning;
        button.innerText === "Start Timer"
          ? (button.innerText = "Stop !")
          : (button.innerText = "Start Timer");
        !isRunning
          ? button.classList.remove("start")
          : button.classList.add("start");
        startCounting();
        break;
    }
  });

  button.addEventListener("mousedown", () => {
    if (button.value !== "start") {
      button.classList.add("hold");
    }
  });
  button.addEventListener("mouseup", () => {
    button.classList.remove("hold");
  });
  button.addEventListener("mouseleave", () => {
    button.classList.remove("hold");
  });
});
