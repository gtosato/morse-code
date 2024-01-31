import { morseCodeToText, textToMorseCode } from "./script.js";

describe("textToMorseCode", () => {
  it("should convert 'HELLO' to '.... . .-.. .-.. ---'", () => {
    const result = textToMorseCode("HELLO");
    expect(result).toBe(".... . .-.. .-.. ---");
  });

  it("should convert 'WORLD' to '.-- --- .-. .-.. -..'", () => {
    const result = textToMorseCode("WORLD");
    expect(result).toBe(".-- --- .-. .-.. -..");
  });

  it("should handle spaces correctly", () => {
    const result = textToMorseCode("HELLO WORLD");
    expect(result).toBe(".... . .-.. .-.. --- / .-- --- .-. .-.. -..");
  });

  it("should handle invalid characters", () => {
    const result = textToMorseCode("@#$");
    expect(result).toBe("");
  });
});

describe("morseCodeToText", () => {
  it("should convert '.... . .-.. .-.. ---' to 'HELLO'", () => {
    const result = morseCodeToText(".... . .-.. .-.. ---");
    expect(result).toBe("HELLO");
  });

  it("should convert '.-- --- .-. .-.. -..' to 'WORLD'", () => {
    const result = morseCodeToText(".-- --- .-. .-.. -..");
    expect(result).toBe("WORLD");
  });

  it("should handle spaces correctly", () => {
    const result = morseCodeToText(
      ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
    );
    expect(result).toBe("HELLO WORLD");
  });

  it("should handle unknown Morse code", () => {
    const result = morseCodeToText("...--- --- ...");
    expect(result).toBe("");
  });
});
