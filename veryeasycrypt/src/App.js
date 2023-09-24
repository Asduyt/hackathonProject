import React, { useState, useEffect } from "react";
import DropdownMenu from './Dropdown';

let input;
let output;

function App() {
  const [word, setWord] = useState("");
  const [password, setPassword] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [encryptionType, setType] = useState("Caesar Cipher");

  const handleSubmit = (e) => {
    e.preventDefault()
    input = word;
    if (isEncrypted) {
      if (encryptionType === "Caesar Cipher"){  
        setPassword(encrypt(input));
      } else {
        setPassword(encrypt2(input));
      }
    } else {
      if (encryptionType === "Caesar Cipher") {
        setPassword(decrypt(input));
      } else {
        setPassword(decrypt2(input));
      }
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

  const changeType = (e) => {
    setType(e.target.value);
  }

  return (
    <div>
      <div className="crypt-title">
        <h2>VeryEasyCrypt</h2>
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

      <DropdownMenu changeType={changeType}/>


      <form className="grocery-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Enter text"
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
            placeholder="Enrypted text"
            value={password}
            disabled="disabled"
          />
          <button type="submit" className="submit-btn">
            RESET
          </button>
        </div>
      </form>

      <button className="clear-btn">
        Save
      </button>


    </div>
  );
}

function encrypt2(word) {
  return "blank";
}

function decrypt2(word) {
  return "blank";
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

