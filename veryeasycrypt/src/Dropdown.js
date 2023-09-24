import React, { useState } from "react";

function DropdownMenu({ changeType }) {
  const options = ["Caesar Cipher", "Second Cipher", "Substitution Cipher", "Polyalphabetic Cipher"]; // Replace with your dropdown options

  return (
    <div className="dropdown-container">
          <select className="dropdown-menu" onChange={changeType}>
            {options.map((option) => (
              <option value={option}>
                {option}
              </option>
              
            ))}
          </select>

    </div>
    
  );

}
export default DropdownMenu;
