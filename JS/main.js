let operator = '';
let currentValue = '';
let previousValue = '';
let previousScreen;
let currentScreen;

document.addEventListener("DOMContentLoaded", function () {
  // store all components on html in our JS
  previousScreen = document.querySelector(".previous");
  currentScreen = document.querySelector(".current");

  let clear = document.querySelector(".clear");
  let back = document.querySelector(".back");

  let operators = document.querySelectorAll(".operator");
  let grayOperators = document.querySelectorAll(".gray-operator");
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

  grayOperators.forEach((op) => op.addEventListener(
    "click", function (e) {
      instantOutput(e.target.value);
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
    previousScreen.textContent = '';
  })

  equal.addEventListener("click", function () {
    if (currentValue != '' && previousValue != '') {
      calculate();
      previousScreen.textContent = '';
      if (previousValue.length <= 10) {
        currentScreen.textContent = previousValue;
      } else {
        currentScreen.textContent =
          previousValue.slice(0, 10) + "...";
      };
    }
  });

  decimal.addEventListener("click", function () {
    addDecimal();
  });
});

// outside function starts here

function handleNumber(num) {
  if (currentValue.length <= 10) {
    currentValue += num;
  }
};

function handleOperator(op) {
  if (previousValue.length > 0
    && currentValue.length == 0) {
    operator = op;
    previousScreen.textContent = previousValue + '' + operator;
    return;
  }
  operator = op;
  previousValue = currentValue;
  currentValue = "";
};

function handleBack() {
  currentValue = currentValue.trim();
  operator = operator.trim();

  if (currentValue.length > 0) {
    currentValue = currentValue
      .substring(0, currentValue.length - 1);
  }
};

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  switch (operator) {
    case "/":
      previousValue /= currentValue;
      break;

    case "x":
      previousValue *= currentValue;
      break;

    case "+":
      previousValue += currentValue;
      break;

    case "-":
      previousValue -= currentValue;
      break;

    default:
      break;
  };

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
};

function instantOutput(operator) {
  currentValue = Number(currentValue);
  switch (operator) {
    case "%":
      currentValue = currentValue / 100;
      break;

    case "power":
      currentValue = Math.pow(currentValue, 2);
      break;

    case "sqrt":
      currentValue = Math.sqrt(currentValue);

    case "negate":
      currentValue = -currentValue;
      break;

    default:
      break;
  }
  currentValue = currentValue.toString();
}

function roundNumber(num) {
  if (Number.isInteger(num)) {
    return num;
  } else if (num % 1 < 0.5) {
    return num.toFixed(4);
  } else {
    return Math.round(num * 100) / 100;
  }
};

function addDecimal() {

  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentScreen.textContent = currentValue;
  }
}