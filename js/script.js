let defaultCardnumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const CARD_NAME_REQUIRED = "Please enter card holder name";
const CARD_NUMBER_REQUIRED = "Please enter card number";
const CVC_REQUIRED = "Please enter CVC";
const EXPIRY_YEAR_REQUIRED = "Please enter year of expiry";
const EXPIRY_MONTH_REQUIRED = "Please enter month of expiry";

const currentCardholder = document.querySelector("#name");
const previousCardholder = document.querySelector(".card-holder-name");

const currentCardnumber = document.querySelector("#number");
const previousCardnumber = document.querySelector(".card-holder");
const form = document.querySelector(".form");
const button = document.querySelector(".btn");
const success = document.querySelector(".success");

currentCardholder.addEventListener("keyup", (event) => {
  previousCardholder.textContent = event.target.value || "Jane Appleseed";
});

currentCardnumber.addEventListener("keyup", (event) => {
  let { value } = event.target;
  if (value) {
    [...value].map((num, index) => {
      defaultCardnumber[index] = num;
    });
  }
  previousCardnumber.textContent = defaultCardnumber
    .join("")
    .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
});

function showMessage(input, message, type) {
  let msg = input.parentNode.querySelector("small");
  msg.textContent = message;

  input.className = type ? "success" : "error";
  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input, "", true);
}

function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let nameValid = hasValue(form.elements["name"], CARD_NAME_REQUIRED);
  let numberValid = hasValue(form.elements["number"], CARD_NUMBER_REQUIRED);
  let monthValid = hasValue(form.elements["month"], EXPIRY_MONTH_REQUIRED);
  let yearValid = hasValue(form.elements["year"], EXPIRY_YEAR_REQUIRED);
  let cvcValid = hasValue(form.elements["cvc"], CVC_REQUIRED);

  if (nameValid && numberValid && monthValid && yearValid && cvcValid) {
    // form.submit();
    button.innerText = "Continue";
    success.classList.toggle("success--hidden");
    form.classList.toggle("form--hidden");
  }
});
