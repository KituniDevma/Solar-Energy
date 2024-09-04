import React from 'react';

function StreamlitEmbed() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="http://localhost:8501" // Replace with your Streamlit app URL
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Streamlit App"
      ></iframe>
    </div>
  );
}

export default StreamlitEmbed;
