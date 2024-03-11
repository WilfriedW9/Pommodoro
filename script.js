const buttons = document.querySelectorAll("button");
const hoursDisplay = document.querySelector("#hours");
const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");
console.log(minutesDisplay, secondsDisplay);
let hours = 0;
let minutes = 0;
let seconds = 0;
hoursDisplay.innerHTML = hours;
minutesDisplay.innerHTML = minutes;
secondsDisplay.innerHTML = hours;

buttons.forEach((button) => {
  console.log(button.value);
  hoursDisplay.innerHTML = hours;
  button.addEventListener("click", () => {
    switch (button.value) {
      case "addHours":
        hours += 1;
        hoursDisplay.innerHTML = hours;
        break;
      case "substractHours":
        hours -= 1;
        hoursDisplay.innerHTML = hours;
        break;
      case "addMinutes":
        minutes += 1;
        minutesDisplay.innerHTML = minutes;
        break;
      case "substractMinutes":
        minutes -= 1;
        minutesDisplay.innerHTML = minutes;
        break;
      case "addSeconds":
        seconds += 1;
        secondsDisplay.innerHTML = seconds;
        break;
      case "substractSeconds":
        seconds -= 1;
        secondsDisplay.innerHTML = seconds;
        break;
    }
  });
});

console.log(buttons);
