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
      if (currentValue.length <= 13) {
        currentScreen.textContent = currentValue;
      } else {
        currentScreen.textContent =
          currentValue.slice(0, 13) + "...";
      };
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

  equal.addEventListener("click", function () {
    if (currentValue != '' && previousValue != '') {
      calculate();
      previousScreen.textContent = '';
      if (previousValue.length <= 13) {
        currentScreen.textContent = previousValue;
      } else {
        currentScreen.textContent =
          previousValue.slice(0, 13) + "...";
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

  if (/[\/x+\-]/.test(currentValue)) {
    return;
  } else if (currentValue.length > 0) {
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
      previousScreen.textContent = currentValue.toString() + "%";
      currentValue = (currentValue / 100);
      break;

    case "power":
      previousScreen.textContent = `${currentValue} ** 2`
      currentValue = Math.pow(currentValue, 2);
      break;

    case "sqrt":
      previousScreen.textContent = `sqrt(${currentValue})`
      if (currentValue >= 0) {
        currentValue = Math.sqrt(currentValue);
      } else {
        currentValue = `Invalid Input`;
      }
      break;

    case "negate":
      previousScreen.textContent = `negate(${currentValue})`
      currentValue = -currentValue;
      break;

    default:
      break;
  }
  currentValue = roundNumber(currentValue);
  currentValue = currentValue.toString();
}

function roundNumber(num) {
  if (typeof num === "number") {
    if (Number.isInteger(num)) {
      return num;
    } else {
      return Math.round(num * 100000) / 100000;
    }
  } else {
    return num;
  }
};


function addDecimal() {

  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentScreen.textContent = currentValue;
  }
}