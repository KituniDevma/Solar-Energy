// src/pages/StreamlitPage.js
import React from 'react';
import StreamlitEmbed from '../Components/StreamlitEmbed'; // Adjust the path as needed

function StreamlitPage() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h1>My Streamlit Dashboard</h1>
      <StreamlitEmbed />
    </div>
  );
}

export default StreamlitPage;
