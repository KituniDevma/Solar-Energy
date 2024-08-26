import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from "./DataContext";

function SearchBar() {
  const [inputValue, setInputValue] = useState(""); // State to track input value
  const { setData, setLocation } = useContext(DataContext);

  const locations = ["Colombo", "Hambantota", "Galle", "Kandy"];

  // This effect runs when the input value changes
  useEffect(() => {
    if (locations.includes(inputValue)) {
      setLocation(inputValue); // Set location in the context
      // Here you can fetch data based on the location and set it in the context
      fetch(`YOUR_API_ENDPOINT?location=${inputValue}`)
        .then(response => response.json())
        .then(data => {
          setData(data); // Update data in the context
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [inputValue, setLocation, setData, locations]);

  return (
    <div style={styles.container}>
      <style>
        {`
          input::placeholder {
            color: #888;
            opacity: 1;
          }
        `}
      </style>

      <input
        type="text"
        placeholder="Search Location"
        style={styles.searchInput}
        value={inputValue} // Bind input value to state
        onChange={(e) => setInputValue(e.target.value)} // Update state on input change
        list="location-options" // Optional: Add a datalist for predefined options
      />

      {/* Optional: Datalist for predefined location options */}
      <datalist id="location-options">
        {locations.map((location, index) => (
          <option key={index} value={location} />
        ))}
      </datalist>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  },
  searchInput: {
    width: '200px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
};

export default SearchBar;
