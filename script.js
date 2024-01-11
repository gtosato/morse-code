const morseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
};

let blnKeyboardIsEnglish = true;
let userInput = document.querySelector("#userInput");
let keyboard = document.querySelector("#keyboard__container");

// CREATE ON SCREEN KEYBOARD
for (const [key, value] of Object.entries(morseCodeMap)) {
  keyboard.innerHTML += `<button id='${key}${value}' onclick='updateUserInput(this.id)'>${key} ${value}</button>`;
}

// CONVERT ENGLISH TO MORSE CODE
function textToMorseCode(text) {
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char === " ") {
        return " ";
      }
      return morseCodeMap[char] || "";
    })
    .join(" ");
}

// CONVERT MORSE CODE TO ENGLISH
function morseCodeToText(morseCode) {
  return morseCode
    .split(" ")
    .map((code) => {
      return (
        Object.keys(morseCodeMap).find((key) => morseCodeMap[key] === code) ||
        ""
      );
    })
    .join("");
}

function updateUserInput(inputChar) {
  blnKeyboardIsEnglish
    ? (userInput.innerHTML += inputChar.charAt(0))
    : (userInput.innerHTML += " " + inputChar.slice(1));
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
  // A-Z 65-90, a-z 97-122
  let myCharacterCode = e.keyCode;

  // CONVERT LETTER TO UPPERCASE
  if (myCharacterCode >= 97 && myCharacterCode <= 122) {
    myCharacterCode -= 32;
  }

  // VALID KEYPRESS (A-Z)
  if (
    (myCharacterCode >= 65 && myCharacterCode <= 90) ||
    myCharacterCode == 32
  ) {
    userInput.innerHTML += String.fromCharCode(myCharacterCode);
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
