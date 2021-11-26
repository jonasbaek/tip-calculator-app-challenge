//all inputs and buttons DOM selects//
let billInput = document.getElementById("bill");
let customInput = document.getElementById("custom");
let peopleInput = document.getElementById("numberp");
let buttonGrid = document.querySelector(".button-grid"); //buttons parent element
let resetButton = document.querySelector(".button-reset");
let amount = document.getElementById("amount"); //amount display
let total = document.getElementById("total"); //total display
let buttons = document.querySelectorAll(".buttons");
let hiddenBill = document.getElementById("billHidden");
let hiddenNumber = document.getElementById("numberHidden");

//store the values to calculate the tip
let storage = {
  bill: "",
  button: "",
  numberPeople: "",
  tip: "",
  total: "",
};

//when select tip button is clicked, store the button value to storage, and erase custom input
const storageButton = (element) => {
  if (element.target.className === "buttons") {
    storage.button = element.target.getAttribute("value");
    customInput.value = "";
    element.target.classList.add("active");
    buttons.forEach((item) => {
      if (item !== element.target) {
        item.classList.remove("active");
      }
    });
  }
};

//function to storage custom
const storageCustom = () => {
  let verify = /^\d+$/.test(customInput.value);
  if (verify && customInput.value.length <= 3) {
    customInput.classList.remove("error");
    storage.button = String(customInput.value * 0.01);
    buttons.forEach((item) => {
      item.classList.remove("active");
    });
  } else {
    customInput.classList.add("error");
    amount.textContent = "$0.00";
    total.textContent = "$0.00";
    if (customInput.value.length > 3) {
      customInput.value = "";
    }
  }
  if (customInput.value === "") {
    customInput.classList.remove("error");
    if (storage.button !== "") {
      storage.button = "";
    }
  }
};

//function to calculate the tip and total and storage
const calculation = () => {
  if (
    storage.bill.length > 0 &&
    storage.button.length > 0 &&
    storage.numberPeople.length > 0
  ) {
    tipAmount = (storage.bill * storage.button) / storage.numberPeople;
    storage.tip = tipAmount;
    totalPerson = storage.bill / storage.numberPeople + tipAmount;
    storage.total = totalPerson;
  }
};

//function to display total and tip amount
const displayResults = () => {
  if (typeof storage.tip === "number") {
    amount.textContent = "$" + storage.tip.toFixed(2);
  }
  if (typeof storage.total === "number") {
    total.textContent = "$" + storage.total.toFixed(2);
  }
  if (
    storage.bill.length === 0 ||
    storage.button.length === 0 ||
    storage.numberPeople.length === 0
  ) {
    amount.textContent = "$0.00";
    total.textContent = "$0.00";
  }
};

//verify if inputs are valid and storageInput
const verifyInputs = (input) => {
  switch (input.id) {
    case "bill":
      let verifyNumber = validadeNumber(input.value);
      if (
        verifyNumber &&
        input.value.charAt(0) !== "0" &&
        input.value.length < 9
      ) {
        input.classList.remove("error");
        hiddenBill.classList.add("hidden");
        storage.bill = formatBill(input.value);
        input.value = formatBill(input.value);
      } else {
        input.classList.add("error");
        hiddenBill.classList.remove("hidden");
        amount.textContent = "$0.00";
        total.textContent = "$0.00";
        if (input.value.length >= 9) {
          input.value = "";
          input.classList.remove("error");
        }
      }
      if (input.value === "" || input.value === ".") {
        hiddenBill.classList.add("hidden");
        storage.bill = "";
        billInput.value = "";
        break;
      }
      break;
    case "numberp":
      let verifyNumberP = /^\d+$/.test(input.value);
      if (
        verifyNumberP &&
        input.value.charAt(0) !== "0" &&
        input.value.length < 9
      ) {
        input.classList.remove("error");
        hiddenNumber.classList.add("hidden");
        storage.numberPeople = input.value;
      } else {
        input.classList.add("error");
        hiddenNumber.classList.remove("hidden");
        amount.textContent = "$0.00";
        total.textContent = "$0.00";
        if (input.value.length >= 9) {
          input.value = "";
        }
      }
      if (input.value === "") {
        hiddenNumber.classList.add("hidden");
        storage.numberPeople = "";
        break;
      }
      break;
  }
  if (input.value === "") {
    switch (input.id) {
      case "bill":
        hiddenBill.classList.add("hidden");
        storage.bill = "";
        break;
      case "numberp":
        hiddenNumber.classList.add("hidden");
        storage.numberPeople = "";
        input.classList.remove("error");
        break;
    }
  }
};

// reset button
const reset = () => {
  let arrayStorage = Object.entries(storage);
  arrayStorage.map((item) => {
    item[1] = "";
  });
  storage = Object.fromEntries(arrayStorage);
  billInput.value = "";
  peopleInput.value = "";
  amount.textContent = "$0.00";
  total.textContent = "$0.00";
  customInput.value = "";
  buttons.forEach((item) => {
    item.classList.remove("active");
  });
};

//validations functions

//verify if input is only number and dot
const validadeNumber = (input) => {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return input.match(rgx);
};

//format input to currency
const formatBill = (input) => {
  let length = input.length;
  let array = input.split("");
  array = array.filter((element) => element !== ".");
  let array1 = array.splice(array.length - 2, 0, ".");
  array = array.join("");
  return array;
};

//all the events to occur dynamically
const dynamicEvents = () => {
  verifyInputs(billInput);
  verifyInputs(peopleInput);
  calculation();
  displayResults();
};

//events
customInput.addEventListener("input", storageCustom);
customInput.addEventListener("input", dynamicEvents);
billInput.addEventListener("input", dynamicEvents);
peopleInput.addEventListener("input", dynamicEvents);
buttonGrid.addEventListener("click", storageButton);
buttonGrid.addEventListener("click", dynamicEvents);
resetButton.addEventListener("click", reset);
