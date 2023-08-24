let operator = '';
let currentValue = '';
let previousValue = '';

document.addEventListener("DOMContentLoaded", function () {
  // store all components on html in our JS
  let previousScreen = document.querySelector(".previous");
  let currentScreen = document.querySelector(".current");

  let clear = document.querySelector(".clear");
  let back = document.querySelector(".back");

  let operators = document.querySelectorAll(".operator");
  let numbers = document.querySelectorAll(".number");

  let decimal = document.querySelector(".decimal");
  let equal = document.querySelector(".equal");


  numbers.forEach((number) => number.addEventListener(
    "click", function (e) {
      handleNumber(e.target.textContent);
      currentScreen.textContent = currentValue;
    }))
});

function handleNumber(num) {
  if (currentValue.length <= 10) {
    currentValue += num;
  }
}