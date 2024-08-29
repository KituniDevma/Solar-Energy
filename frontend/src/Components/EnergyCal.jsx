import React, { useState } from 'react';
import './EnergyCal.css'; 
const EnergyCal = () => {
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [area, setArea] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (width && length) {
      setArea(width * length);
    }
  };

  return (
    <div className="area-calculator">
      <form onSubmit={handleSubmit}>
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
      {area !== null && (
        <div className="result">
          <h3>Calculated Energy: {area} kWh/m²</h3>
        </div>
      )}
    </div>
  );
};

export default  EnergyCal;
