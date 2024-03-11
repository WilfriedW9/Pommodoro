const buttons = document.querySelectorAll("button");
const hoursDisplay = document.querySelector("#hours");
const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");
const cycleCounter = document.querySelector("#cycleCounter")
let hours = 0;
let minutes = 25;
let seconds = 0;
let cycle = 0

cycleCounter.innerText = cycle

hoursDisplay.innerHTML = hours;
minutesDisplay.innerHTML = minutes;
secondsDisplay.innerHTML = hours;

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
        button.innerText === "Start Timer" ? button.innerText = "Stop !" : button.innerText = "Start Timer"
        button.classList.contains("start") ? button.classList.remove("start") : button.classList.add("start")
        break;
    }
  });

  button.addEventListener("mousedown", () => {
    if(button.value !== "start"){
        button.classList.add("hold")
    }
  });
  button.addEventListener("mouseup", () => {
    button.classList.remove("hold")
  });
  button.addEventListener("mouseleave", () => {
    button.classList.remove("hold")
  });
});
