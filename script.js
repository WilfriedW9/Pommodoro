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
const speed = 80
let isRunning = false;

hoursDisplay.innerText = hours;
minutesDisplay.innerText = minutes;
secondsDisplay.innerText = seconds;
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
      if (hours === 0 && minutes === 0 && seconds === 0) {
        isRunning = false;
        startBtn.classList.remove("start");
        startBtn.innerText = "Pick a time period";
        cycle += 1;
        cycleCounter.innerText = cycle;
        console.log("disabled button")
        startBtn.disabled = true
        startBtn.classList.remove("start")
        startBtn.classList.add("disabled")
        clearInterval(secondsIntervalId);
      }
      console.log(seconds);
      secondsDisplay.innerText = seconds;
      minutesDisplay.innerText = minutes;
      hoursDisplay.innerText = hours;
    }, 1000);
  } else {
    isRunning = false;
    clearInterval(secondsIntervalId);
  }
}

// Contrôle boutons sur clique
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    startBtn.classList.remove("disabled")
    startBtn.disabled = false
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
        isRunning
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
    if(hours === 0 && minutes === 0 && seconds === 0){
      startBtn.classList.add("disabled")
      startBtn.innerText = "Pick a time period";
      startBtn.disabled = true
    }
    console.log("hours: "+ hours + " minutes: "+ minutes + " seconds: " + seconds)
  });

  // Contrôle bouton sur maintien

  button.addEventListener("mousedown", () => {
    if (button.value !== "start") {
      switch (button.value) {
        case "addHours":
          holdDownid = setInterval(() => {
            hours++;
            hours === 100 ? hours = 0 : hours
            hoursDisplay.innerHTML = hours;
          }, speed);
          break;
        case "substractHours":
          holdDownid = setInterval(() => {
            hours--;
            hours < 0 ? hours = 99 : hours
            hoursDisplay.innerHTML = hours;
          }, speed);
          break;
        case "addMinutes":
          holdDownid = setInterval(() => {
            minutes++;
            minutes > 59 ? minutes = 0 : minutes
            minutesDisplay.innerHTML = minutes;
          }, speed);
          break;
        case "substractMinutes":
          holdDownid = setInterval(() => {
            minutes--;
            minutes < 0 ? minutes = 59 : minutes
            minutesDisplay.innerHTML = minutes;
          }, speed);
          break;
        case "addSeconds":
          holdDownid = setInterval(() => {
            seconds++;
            seconds > 59 ? seconds = 0 : seconds
            secondsDisplay.innerHTML = seconds;
          }, speed);
          break;
        case "substractSeconds":
          holdDownid = setInterval(() => {
            seconds--;
            seconds < 0 ? seconds = 59 : seconds
            secondsDisplay.innerHTML = seconds;
          }, speed);
          break;
      }
      button.classList.add("hold");
    }
  });
  button.addEventListener("mouseup", () => {
    clearInterval(holdDownid);
    button.classList.remove("hold");
  });
  button.addEventListener("mouseleave", () => {
    clearInterval(holdDownid);
    button.classList.remove("hold");
  });
});
