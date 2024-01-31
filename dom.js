import { textToMorseCode, morseCodeToText } from "./script.js";
import morseCodeMap from "./morseCodeMap.js";

let blnKeyboardIsEnglish = true;
let userInput = document.querySelector("#userInput");
let keyboard = document.querySelector("#keyboard__container");
keyboard.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    updateUserInput(event);
  }
});

// CREATE ON SCREEN KEYBOARD
function buildKeyboard() {
  for (const [key, value] of Object.entries(morseCodeMap)) {
    let button = document.createElement("button");
    button.id = `${key}${value}`;
    if (value === "/") {
      button.innerHTML = `${key} Space`;
    } else {
      button.innerHTML = `${key} ${value}`;
    }
    keyboard.appendChild(button);
  }
}

buildKeyboard();

function updateUserInput(e) {
  blnKeyboardIsEnglish
    ? (userInput.innerHTML += e.target.id.charAt(0))
    : (userInput.innerHTML += " " + e.target.id.slice(1));
}

function clearUserInput() {
  document.querySelector("#userInput").innerHTML = "";
  document.querySelector("#translated__text").innerHTML = "";
}

function translateUserInput() {
  const inputText = document.querySelector("#userInput").innerHTML;
  const morseCodeResult = textToMorseCode(inputText);
  const decodedText = morseCodeToText(userInput.innerHTML);

  if (!inputText) {
    alert("Please enter some text to translate.");
  } else {
    blnKeyboardIsEnglish
      ? (document.querySelector("#translated__text").innerHTML =
          morseCodeResult)
      : (document.querySelector("#translated__text").innerHTML = decodedText);
  }
}

function convertUserInput() {
  const morseCodeResult = textToMorseCode(userInput.innerHTML);
  const decodedText = morseCodeToText(userInput.innerHTML);

  if (!blnKeyboardIsEnglish) {
    document.querySelector("#userInput").innerHTML = morseCodeResult;
  } else {
    document.querySelector("#userInput").innerHTML = decodedText;
  }
}

// SWAP CHARACTER MODES IF USER CLICKS RADIO BUTTON WHEN TEXT AREAS CURRENTLY HAVE TEXT
function convertTextAreas() {
  let tmpValue = "";
  let userInput = document.querySelector("#userInput").innerHTML;
  let translatedText = document.querySelector("#translated__text").innerHTML;

  // IF BOTH TEXT AREAS CONTAIN TEXT, SWAP
  if (userInput && translatedText) {
    tmpValue = userInput;

    document.querySelector("#userInput").innerHTML = translatedText;
    document.querySelector("#translated__text").innerHTML = "";

    // CONVERT EXISTING USER INPUT
  } else if (userInput && !translatedText) {
    convertUserInput();
  }
}

function convertKeyboardType() {
  document.querySelector("#englishMode").checked
    ? (blnKeyboardIsEnglish = true)
    : (blnKeyboardIsEnglish = false);

  convertTextAreas();
}

function getUserKeypress(e) {
  if (!blnKeyboardIsEnglish) {
    return;
  }
  // A-Z (65-90), a-z (97-122), 0-9 (48-57)
  let myCharacterCode = e.keyCode;

  // CONVERT LETTER TO UPPERCASE
  if (myCharacterCode >= 97 && myCharacterCode <= 122) {
    myCharacterCode -= 32;
  }

  // VALID KEYPRESS (A-Z)
  if (
    (myCharacterCode >= 65 && myCharacterCode <= 90) ||
    myCharacterCode == 32 ||
    (myCharacterCode >= 48 && myCharacterCode <= 57)
  ) {
    userInput.innerHTML += String.fromCharCode(myCharacterCode);
  }
}

function getUserKeyDownpress(e) {
  if (!blnKeyboardIsEnglish) {
    alert(
      "You must have keyboard in English mode to type.  Please use on-screen keyboard when in Morse Code mode."
    );
    return;
  }

  if (e.key === "Delete" || e.key === "Backspace") {
    // Handle delete key press here
    userInput.innerHTML = userInput.innerHTML.slice(0, -1);
  }
}

// QUERY SELECTORS AND EVENT LISTENERS
const btnClear = document.querySelector("#btn_clear");
btnClear.addEventListener("click", clearUserInput);

const btnTranslate = document.querySelector("#btn_translate");
btnTranslate.addEventListener("click", translateUserInput);

const englishMode = document.querySelector("#englishMode");
englishMode.addEventListener("click", convertKeyboardType);

const morseCodeMode = document.querySelector("#morseCodeMode");
morseCodeMode.addEventListener("click", convertKeyboardType);

userInput.addEventListener("keypress", getUserKeypress);
userInput.addEventListener("keydown", getUserKeyDownpress);
