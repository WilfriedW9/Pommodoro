// Récupération éléments + initialisation variables

const buttons = document.querySelectorAll("button");
const hoursDisplay = document.querySelector("#hours");
const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");
const cycleCounter = document.querySelector("#cycleCounter");
const startBtn = document.querySelector("#startBtn");
const restTime = document.querySelector("#restTime");

let hours = 0;
let minutes = 5;
let seconds = 0;
let cycle = 0;
let isRunning = false;

hoursDisplay.innerHTML = hours;
minutesDisplay.innerHTML = minutes;
secondsDisplay.innerHTML = seconds;
cycleCounter.innerText = cycle;

// ID des intervalles
let secondsIntervalId;
let holdDownid;

// Calcule du temps de repos nécessaire
function restTimeCalc(seconds, minutes, hours) {
  let sum = 0;
  sum += (seconds + minutes * 60 + hours * 3600) / 5;
  console.log(sum);
  restTime.innerHTML = Math.ceil(sum) + " seconds";
}

// Fonction pour pouvoir maintenir une touche et auto-incrémenter
function hold(timeUnit) {
  holdDownid = setInterval(() => {
    switch (timeUnit) {
      case seconds:
        seconds += 1
        break;
      case minutes:
        minutes += 1
        break;
      case hours:
        hours += 1
        hoursDisplay.innerHTML = hours;
        console.log("ok")
        break;
    }
  }, 100);
}

// Création du compteur
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
        isRunning = false;
        startBtn.classList.remove("start");
        startBtn.innerText = "Start Timer";
        cycle += 1;
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
    isRunning = false;
    clearInterval(secondsIntervalId);
  }
}

// Contrôle de la durée du compteur
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
        if (isRunning) {
          restTimeCalc(seconds, minutes, hours);
        }
        break;
    }
  });

  button.addEventListener("mousedown", () => {
    if (button.value !== "start") {
      hold(hours);
      button.classList.add("hold");
    }
  });
  button.addEventListener("mouseup", () => {
    clearInterval(holdDownid);
    button.classList.remove("hold");
  });
  button.addEventListener("mouseleave", () => {
    button.classList.remove("hold");
  });
});
