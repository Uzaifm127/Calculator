// Variables

const output = document.querySelector(".output");
const outputRes = document.querySelector(".outputRes");
const outputCalc = document.querySelector(".outputCalc");
const keys = document.querySelectorAll(".keysBtn");
let currentValue = "";
let previousValue = "";
let operator = "";

// Functions
const backLogic = () => {
  switch (true) {
    case currentValue === "" && previousValue === "" && operator === "":
      return;
    case currentValue !== "" && previousValue === "" && operator === "":
      currentValue = currentValue.slice(0, -1);
      calcPaint(currentValue);
      break;
    case currentValue !== "" && previousValue !== "" && operator !== "":
      currentValue = currentValue.slice(0, -1);
      calcPaint(previousValue + operator + currentValue);
      break;
    case previousValue !== "" && operator !== "" && currentValue === "":
      operator = "";
      calcPaint(previousValue);
      currentValue = previousValue;
      previousValue = "";
      break;
  }
};

const resultPaint = (resValue) => {
  outputRes.innerHTML = resValue;
};

const calcPaint = (calcValue) => {
  outputCalc.innerHTML = calcValue;
};

// Main Logic

keys.forEach((button) => {
  button.addEventListener("click", (e) => {
    let btnValue = button.innerText;
    if (/[0-9.]/.test(btnValue)) {
      currentValue += btnValue;
      if (operator !== "") {
        calcPaint(previousValue + operator + currentValue);
      } else {
        calcPaint(currentValue);
      }
    } else if (["+", "-", "x", "/"].includes(btnValue)) {
      previousValue = operator === "" ? currentValue : previousValue;
      currentValue = "";
      operator = btnValue;
      calcPaint(previousValue + operator);
    } else if (btnValue === "AC") {
      resultPaint("");
      calcPaint("");
      currentValue = "";
      previousValue = "";
      operator = "";
    } else if (
      btnValue === "=" &&
      currentValue !== "" &&
      previousValue !== ""
    ) {
      let previousValueInt = parseFloat(previousValue);
      let currentValueInt = parseFloat(currentValue);
      switch (operator) {
        case "+":
          resultPaint(previousValueInt + currentValueInt);
          break;
        case "-":
          resultPaint(previousValueInt - currentValueInt);
          break;
        case "x":
          resultPaint(previousValueInt * currentValueInt);
          break;
        case "/":
          if (currentValueInt === 0) {
            resultPaint("Error: Not Defined");
          } else {
            resultPaint(previousValueInt / currentValueInt);
          }
          break;
      }
      currentValue = "";
      previousValue = "";
      operator = "";
    } else if (btnValue === "<--") {
      backLogic();
    }
  });
});
