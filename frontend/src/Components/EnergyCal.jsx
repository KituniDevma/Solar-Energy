import React, { useState } from 'react';
import './EnergyCal.css'; 

const EnergyCal = () => {
  const [width, setWidth] = useState(0);  // Initialize with 0
  const [length, setLength] = useState(0);  // Initialize with 0
  const [area, setArea] = useState(0);  // Initialize with 0

  const handleSubmit = (e) => {
    e.preventDefault();
    if (width && length) {
      setArea(width * length);
    }
  };

  return (
    <div className="area-calculator">
      <div className="columns">
        <form onSubmit={handleSubmit} className="form-column">
          <div className="input-group">
            <label htmlFor="width">Width:</label>
            <input
              type="number"
              id="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="length">Length:</label>
            <input
              type="number"
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              required
            />
          </div>
          <button type="submit">Calculate Energy</button>
        </form>

        <div className="output-column">
          <div className="result">
            <h3>Calculated Energy: {area} kWh</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyCal;
