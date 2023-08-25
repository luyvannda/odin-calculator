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
    }));

  operators.forEach((op) => op.addEventListener(
    "click", function (e) {
      handleOperator(e.target.textContent);
      previousScreen.textContent = previousValue + ' ' + operator;
      currentScreen.textContent = currentValue;
    }));

  clear.addEventListener("click", function () {
    previousValue = '';
    currentValue = '';
    operator = '';
    previousScreen.textContent = previousValue;
    currentScreen.textContent = currentValue;
  });


  back.addEventListener("click", function () {
    handleBack();
    currentScreen.textContent = currentValue;
  })
});

// outside function starts here

function handleNumber(num) {
  if (currentValue.length <= 10) {
    currentValue += num;
  }
};

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = '';
};

function handleBack() {
  if (currentValue.length > 0) {
    currentValue = currentValue
      .substring(0, currentValue.length - 1);
  } else if (operator.length > 0) {
    operator = '';
    previousValue = '';
  }
};