import morseCodeMap from "./morseCodeMap.js";

// CONVERT ENGLISH TO MORSE CODE
function textToMorseCode(text) {
  const validCharacters = new Set(Object.keys(morseCodeMap));
  const inputCharacters = new Set(text.toUpperCase().split(""));

  const invalidCharacters = [...inputCharacters].filter(
    (char) => !validCharacters.has(char)
  );

  if (invalidCharacters.length > 0) {
    return "";
  }

  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char === " ") {
        return "/";
      }
      return morseCodeMap[char] || "";
    })
    .join(" ");
}

// CONVERT MORSE CODE TO ENGLISH
function morseCodeToText(morseCode) {
  const morseCodeValues = Object.values(morseCodeMap);
  const morseCodeSet = new Set(morseCodeValues);

  const trimmedMorseCode = morseCode.trim();
  const morseCodeArray = trimmedMorseCode.split(" ");

  for (const code of morseCodeArray) {
    if (!morseCodeSet.has(code)) {
      return "";
    }
  }

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

export { textToMorseCode, morseCodeToText };
