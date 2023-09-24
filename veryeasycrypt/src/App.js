import React, { useState, useEffect } from "react";
import DropdownMenu from "./Dropdown";
import List from "./List";

let input;
let output;

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [list, setList] = useState(getLocalStorage([]));
  const [word, setWord] = useState("");
  const [view, setView] = useState(false);
  const [password, setPassword] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [encryptionType, setType] = useState("Caesar Cipher");

  const handleSave = (e) => {
    e.preventDefault();
    if (word && password) {
      const newItem = {
        id: new Date().getTime().toString(),
        title: word,
        value: password,
      };
      setList([...list, newItem]);
      setWord("");
      setPassword("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    input = word;
    if (isEncrypted) {
      if (encryptionType === "Caesar Cipher") {
        setPassword(encryptCaesar(input));
      } else if (encryptionType === "Vigenere Cipher") {
        setPassword(encryptVigenere(input));
      } else {
        setPassword("8mVvCOzpE68TArbs");
      }
    } else {
      if (encryptionType === "Caesar Cipher") {
        setPassword(decryptCaesar(input));
      } else if (encryptionType === "Vigenere Cipher") {
        setPassword(decryptVigenere(input));
      } else {
        setPassword("8mVvCOzpE68TArbs");
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
  };

  const viewItem = () => {
    setView(!view);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

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

      <DropdownMenu changeType={changeType} />

      <form className="grocery-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Input Text"
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
            placeholder="Encrypted Text"
            value={password}
            disabled="disabled"
          />
          <button type="submit" className="submit-btn">
            RESET
          </button>
        </div>
      </form>
      <form onSubmit={handleSave}>
        <button className="clear-btn">Save</button>
      </form>
      <p>{list.length}</p>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            removeItem={removeItem}
            viewItem={viewItem}
            view={view}
          />
        </div>
      )}
    </div>
  );
}

//Encrypt a given word using a Caesar Cypher with a key of 2
function encryptCaesar(word) {
  var encryptedWord = "";

  //Iterate through each letter of the word
  for (let i = 0; i < word.length; i++) {
    //Account for spaces
    if (word[i] === " ") {
      encryptedWord += " ";
      i++;
    }
    var letter = word.charAt(i);
    var asciiNum = letter.charCodeAt(0);
    var newNum = asciiNum + 2;

    //Check if the char is lowercase
    if (asciiNum < 91 && asciiNum > 64) {
      //Check if the char is out of bounds and fix it
      if (newNum > 90) {
        newNum -= 26;
      }
    }

    //Check if the char is uppercase
    if (asciiNum < 123 && asciiNum > 96) {
      //Check if the char is out of bounds and fix it
      if (newNum > 122) {
        newNum -= 26;
      }
    }

    //Append the encrypted letter to a string
    encryptedWord += String.fromCharCode(newNum);
  }
  return encryptedWord;
}

//Decrypt an encrypted Caesar Cypher string
function decryptCaesar(word) {
  var decryptedWord = "";

  ////Iterate through each letter of the string
  for (let i = 0; i < word.length; i++) {
    //Account for spaces
    if (word[i] === " ") {
      decryptedWord += " ";
      i++;
    }
    var letter = word.charAt(i);
    var asciiNum = letter.charCodeAt(0);
    var newNum = asciiNum - 2;

    //Check if the char is lowercase
    if (asciiNum < 91 && asciiNum > 64) {
      //Check if the char is out of bounds and fix it
      if (newNum < 65) {
        newNum += 26;
      }
    }
    //Check if the char is uppercase
    else if (asciiNum < 123 && asciiNum > 96) {
      //Check if the char is out of bounds and fix it
      if (newNum < 97) {
        newNum += 26;
      }
    }

    //Append decrypted letter to a string
    decryptedWord += String.fromCharCode(newNum);
  }
  return decryptedWord;
}

function encryptVigenere(word, key) {
  var rows = 26;
  var cols = 26;
  var vigenereArray = [];
  var keyCount = 0;
  var tempWord = word.toUpperCase();
  var encryptedWord = "";

  for (let i; i < rows; i++) {
    vigenereArray[i] = [];
    for (let j = 0; j < cols; j++) {
      vigenereArray[i][j] = i + j;
    }
  }

  for (let i = 0; i < word.length(); i++) {
    if (word[i] === " ") {
      encryptedWord += " ";
      i++;
    }
    var letter = tempWord.charAt(i);
    var wordNum = letter.charCodeAt(0) - 65;
    var keyLetter = key.toUpperCase().charAt(keyCount);
    var keyNum = keyLetter.charCodeAt(0) - 65;
    var newNum = wordNum + keyNum;
    if (newNum > 25) {
      newNum -= 26;
    }
    if (
      word.charAt(i).charCodeAt(0) > 64 &&
      word.charAt(i).charCodeAt(0) < 91
    ) {
      newNum += 65;
    } else {
      newNum += 97;
    }
    encryptedWord += String.fromCharCode(newNum);
    keyCount++;
    if (keyCount === key.length){
      keyCount = 0;
    }
  }
  return encryptedWord;
}

function decryptVigenere(word, key) {

  var keyCount = 0;
  var tempWord = word.toUpperCase();
  var decryptedWord = "";

  for (let i = 0; i < word.length; i++){
    if (word[i] == " "){
      decryptedWord += " ";
      i++;
    }
    var letter = tempWord.charAt(i);
    var wordNum = letter.charCodeAt(0) - 65;
    var keyLetter = (key.toUpperCase()).charAt(keyCount);
    var keyNum = keyLetter.charCodeAt(0) - 65;
    var newNum = wordNum - keyNum;
    if (newNum < 25){
      newNum += 26;
    }
    if ((word.charAt(i)).charCodeAt(0) > 64 && (word.charAt(i)).charCodeAt(0) < 91){
      newNum += 65;
    }
    else{
      newNum += 97;
    }
    encryptedWord += String.fromCharCode(newNum);
    keyCount++;
    if (keyCount === key.length){
      keyCount = 0;
    }
  }
  return decryptedWord;
}

export default App;
