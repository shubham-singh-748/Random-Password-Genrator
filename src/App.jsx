import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  // For password length
  const [PassLength, setPassLength] = useState(8);

  // numbers checkbox
  const [NumbersAllowed, setNumbersAllowed] = useState(false);

  // characters checkbox
  const [CharactersAllowed, setCharactersAllowed] = useState(false);

  // taking input password
  const [Password, setPassword] = useState("");

  // this function calls simultaneously passlength,numbersAllowed and characters allowed state.
  // Because we want changes in password when user clicked on length, numbers or characters, the password input should be change accordingly.
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let specialChar = "~!@#$%^&*()_+{}:|<>?`-=[];,./";

    // if number checkbox has checked, then include numbers in password
    if (NumbersAllowed) str += num;

    // if character's checkbox has checked, then  include characters in password
    if (CharactersAllowed) str += specialChar;

    // generating random password
    for (let i = 1; i <= PassLength; ++i) {
      let randomPass = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomPass);
    }

    // we locate setPassword to password which obtained pass variable.
    setPassword(pass);

    // passlength, numberallowed and charactersallowed are the dependencies.
  }, [PassLength, NumbersAllowed, CharactersAllowed]);

  // useEffect hook is used to call "passwordGenerator()" by passing Passlength,NumbersAllowe,CharactersAllowed
  useEffect(() => {
    passwordGenerator();
  }, [PassLength, NumbersAllowed, CharactersAllowed]);

  // logic for copy text to clipboard
  const PasswordRef = useRef(null);

  const [ChangeCopyBtnText, setChangeCopyBtnText] = useState("copy");
  const copyPassToClipboard = useCallback(() => {
    // it highlight password's background
    PasswordRef.current?.select();

    // it saves password to clipboard
    window.navigator.clipboard.writeText(Password);

    setChangeCopyBtnText("copied!");
  }, [Password]);

  return (
    <div className="h-[100vh] flex items-center justify-center bg-yellow-950 text-white ">
      <div className="bg-slate-600 px-[22px] py-[14px] rounded-xl">
        <h1 className="text-4xl font-bold font-serif text-center mt-[10px]">
          Password Generator
        </h1>

        {/* password displaying section */}
        <div className="mt-[15px] flex">
          <input
            onClick={() => setChangeCopyBtnText("copy")}
            value={Password}
            type="text"
            className="w-[350px] py-[8px] px-[10px] font-semibold outline-none text-3xl text-yellow-600 rounded-l-2xl"
            ref={PasswordRef}
          />

          {/* copy button section */}
          <button
            onClick={copyPassToClipboard}
            className="text-3xl font-semibold bg-blue-600 rounded-r-2xl py-[8px] px-[10px]"
          >
            {ChangeCopyBtnText}
          </button>
        </div>

        {/* length, numbers and characters section */}
        <div
          onClick={() => setChangeCopyBtnText("copy")}
          className="mt-[15px] pb-[10px] flex items-center justify-between text-yellow-600 font-bold tracking-wide"
        >
          {/* length section */}
          <div className="flex">
            <input
              // "value" describes it's default length which is "8" and by onchange(), we can decrease or increase it's value.
              value={PassLength}
              onChange={(e) => setPassLength(e.target.value)}
              type="range"
              min={8}
              max={30}
            />
            <h1 className="text-2xl ml-[5px]">Length:{PassLength}</h1>
          </div>

          {/* numbeers section */}
          <div className="flex text-3xl">
            <input
              value={NumbersAllowed}
              onChange={() => setNumbersAllowed((prev) => !prev)}
              type="checkbox"
              className="ml-[22px]"
            />
            <h1 className="text-2xl ml-[5px]">Numbers</h1>
          </div>

          {/* characters section */}
          <div className="flex text-3xl">
            <input
              value={CharactersAllowed}
              onChange={() => setCharactersAllowed((prev) => !prev)}
              type="checkbox"
              className="ml-[22px]"
            />
            <h1 className="text-2xl ml-[5px]">Characters</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
