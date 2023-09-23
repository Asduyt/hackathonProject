
import React, { useState, useEffect } from 'react'

let input;
let output;

function App() {
  const [word, setWord] = useState('');
  const [password, setPassword] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    input = word;
    setPassword(encrypt());

  }

  const handleType = (id) => {
    //e.preventDefault()
    if (id === "encrypt") {
      setIsEncrypted(true);
    } else {
      setIsEncrypted(false);
    }
  }

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

      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
      </table>
    </div>
  );
}


function encrypt() {

  return "8mVvCOzpE68TArbs";
}

export default App;
