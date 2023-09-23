
import React, { useState, useEffect } from 'react'

let input;

function App() {
  const [word, setWord] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    input = word;
    setPassword(encrypt(input));

  }

  return (
    <div>
      <div className="crypt-title">
        <h3>VeryEasyCrypt</h3>
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
            ENCRYPT
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
//sdfsdfsdfsdfsdf
function encrypt(word){

  var encryptedWord = word;
  var tempWord = word;

  for (let i = 0; i < word.length; i++){
    var letter = word.charat(i);
    var asciiNum = letter.charCodeAt(i);
    var newNum = asciiNum + 2;
    if(asciiNum < 91 && asciiNum > 64){
      if(newNum > 90){
        newNum -= 26;
      }
    }
    if(asciiNum < 123 && asciiNum > 96){
      if(newNum > 122){
        newNum -= 26;
      }
    }
    encryptedWord = encryptedWord.replace(tempWord[0], String.fromCharCode(newNum));
    if(tempWord.length !== 1){
      tempWord = tempWord.substring(1);
    }
  }
  return encryptedWord;
}

export default App;
