import React, { useState } from "react";

function SearchBar() {
  const [selectedLocation, setSelectedLocation] = useState("Colombo");

  const locations = ["Colombo", "Hambantota", "Galle", "Kandy"];
 
  
  return (
    <div style={styles.container}>
     <style>
        {`
          input::placeholder {
            color: #888; /* Set placeholder color to a light gray */
            opacity: 1; /* Override the default opacity to make the color fully opaque */
          }
        `}
      </style>

      
      <input
        type="text"
         placeholder="Search Location"
        
        style={styles.searchInput}
      />
      <div style={styles.locationButtons}>
        {locations.map((location) => (
          <button
            key={location}
            onClick={() => setSelectedLocation(location)}
            style={{
              ...styles.locationButton,
              backgroundColor: selectedLocation === location ? '#e5e5d4' : '#f1f1f1',
              fontWeight: selectedLocation === location ? 'bold' : 'normal',
              boxShadow: selectedLocation === location ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
            }}
          >
            {location === "Colombo" && (
              <span role="img" aria-label="home" style={styles.icon}>
                🏠
              </span>
            )}
            {location}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    padding: '30px',
    borderRadius: '10px',
    
     width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  
  searchInput: {
    flex: 1,
    padding: '10px 20px',
    fontSize: '16px',
    color: 'black',

    borderRadius: '20px',
    border: '1px solid #ccc',
    marginRight: '20px',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
     backgroundColor: 'rgba(255, 255, 255, 0.7)',
     maxWidth: '550px',
  },
  
  locationButtons: {
    display: 'flex',
    gap: '10px',
    
  },
  locationButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',





  },
  icon: {
    marginRight: '8px',
  },
};
