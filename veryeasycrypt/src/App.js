import React, { useState, useEffect } from "react";

let input;
let output;

function App() {
  const [word, setWord] = useState("");
  const [password, setPassword] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    input = word;
    if (isEncrypted) {
      setPassword(encrypt(input));
    } else {
      setPassword(decrypt(input));
    }
  };

  const handleType = (id) => {
    //e.preventDefault()
    if (id === "encrypt") {
      setIsEncrypted(true);
    } else {
      setIsEncrypted(false);
    }
    setWord("");
    setPassword("");
  };

  return (
    <div>
      <div className="crypt-title">
        <h3>VeryEasyCrypt</h3>
      </div>
      <div className="button-container">
        <button
          id="encrypt"
          className="edit-btn"
          onClick={() => handleType("encrypt")}
        >
          ENCRYPT
        </button>
        <button
          id="decrypt"
          className="edit-btn"
          onClick={() => handleType("decrypt")}
        >
          DECRYPT
        </button>
      </div>
      <form className="grocery-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="bananas"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEncrypted ? "ENCRYPT" : "DECRYPT"}
          </button>
        </div>
      </form>
      <form className="grocery-form">
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="bananas"
            value={password}
            disabled="disabled"
          />
          <button type="submit" className="submit-btn">
            RESET
          </button>
        </div>
      </form>
    </div>
  );
}

function encrypt(word) {
  var encryptedWord = "";

  for (let i = 0; i < word.length; i++) {
    if (word[i] === " "){
      encryptedWord += " ";
      i++;
    }
    var letter = word.charAt(i);
    var asciiNum = letter.charCodeAt(0);
    var newNum = asciiNum + 2;
    if (asciiNum < 91 && asciiNum > 64) {
      if (newNum > 90) {
        newNum -= 26;
      }
    }
    if (asciiNum < 123 && asciiNum > 96) {
      if (newNum > 122) {
        newNum -= 26;
      }
    }
    encryptedWord += String.fromCharCode(newNum);
  }
  return encryptedWord;
}

function decrypt(word) {
  var decryptedWord = "";

  for (let i = 0; i < word.length; i++) {
    if (word[i] === " "){
      decryptedWord += " ";
      i++;
    }
    var letter = word.charAt(i);
    var asciiNum = letter.charCodeAt(0);
    var newNum = asciiNum - 2;
    if (asciiNum < 91 && asciiNum > 64) {
      if (newNum < 65) {
        newNum += 26;
      }
    }
    if (asciiNum < 123 && asciiNum > 96) {
      if (newNum < 97) {
        newNum += 26;
      }
    }
    decryptedWord += String.fromCharCode(newNum);
  }
  return decryptedWord;
}

export default App;
