import { useEffect, useState, useRef } from "react";
import { PasswordOptionInput } from "./PasswordOptionInput";

const SPECIAL_CHARACTERS = "!@#$%^&*()_+";
const NUMBERS = "0123456789";
const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const initialOptions = {
  lengthLimit: 8,
  isNumbersAllowed: false,
  isSpecialCharactersAllowed: false,
};

export const PasswordGenerator = () => {
  const [options, setOptions] = useState(initialOptions);
  const [password, setPassword] = useState("");

  const passwordRef = useRef();

  useEffect(() => {
    generateRandomPassword(options);
  }, [options]);

  function copyPasswordToClipboard() {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }

  function generateRandomPassword(passwordOptions = initialOptions) {
    let allowedChars = LETTERS;
    let generatedPassword = "";

    if (passwordOptions.isNumbersAllowed) {
      allowedChars += NUMBERS;
    }

    if (passwordOptions.isSpecialCharactersAllowed) {
      allowedChars += SPECIAL_CHARACTERS;
    }

    const maxPasswordLength = passwordOptions.lengthLimit;

    for (let i = 0; i < maxPasswordLength; i++) {
      const randomNumber = Math.round(
        Math.random() * (allowedChars.length - 1)
      );
      const randomCharacter = allowedChars[randomNumber];
      generatedPassword += randomCharacter;
    }

    setPassword(generatedPassword);
  }

  return (
    <div className="w-[90%] md:w-[700px] bg-slate-600 py-6 px-4 md:p-8 text-center rounded-lg">
      <h1 className="text-xl md:text-2xl text-white font-medium">Password generator</h1>
      <div className="sm:h-[45px] gap-2 sm:gap-0 flex-col sm:flex-row flex w-full my-6">
        <input
          ref={passwordRef}
          value={password}
          readOnly
          type="text"
          className="selection:bg-blue-300 bg-white text-orange-600 p-2 md:p-4 border-none outline-none rounded-sm sm:rounded-none sm:rounded-l-[4px] sm:flex-1"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-sm sm:rounded-none sm:rounded-r-[4px] sm:w-[100px]"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center px-2 text-white">
        <PasswordOptionInput
          type="range"
          id="length-range"
          step={1}
          min={8}
          value={options.lengthLimit}
          onChange={(e) =>
            setOptions({ ...options, lengthLimit: e.target.value })
          }
        >
          Length: {options.lengthLimit}
        </PasswordOptionInput>

        <PasswordOptionInput
          type="checkbox"
          id="allow-numbers"
          value={options.isNumbersAllowed}
          onChange={() =>
            setOptions({
              ...options,
              isNumbersAllowed: !options.isNumbersAllowed,
            })
          }
        >
          Allow Numbers
        </PasswordOptionInput>

        <PasswordOptionInput
          type="checkbox"
          id="allow-special-chars"
          value={options.isSpecialCharactersAllowed}
          onChange={() =>
            setOptions({
              ...options,
              isSpecialCharactersAllowed: !options.isSpecialCharactersAllowed,
            })
          }
        >
          Allow Characters
        </PasswordOptionInput>
      </div>
    </div>
  );
};
