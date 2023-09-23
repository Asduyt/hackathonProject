
import React, { useState, useEffect } from 'react'

function App() {
  const [word, setWord] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    setPassword(encrypt());

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
      <div className="form-control">
        <input
          type="text"
          className="grocery"
          value={password}
          placeholder="bananas"
          disabled="disabled"
        />
      </div>
    </div>
  );
}
//sdfsdfsdfsdfsdf
function encrypt() {
  return "yo";
}

export default App;
