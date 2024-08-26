import React, { useState } from "react";
import backgroundImage from '../Components/Assets/Background.png';
import { Link } from "react-router-dom";
import Header from "../Components/header";
import SearchBar from "../Components/searchBar";
import Weather from "../Components/weather";

function DashboardPage() {
  return (
    <div style={styles.container}>
      <Header />
      <SearchBar />
      <Weather />
      
    </div>
  );
}

export default DashboardPage;

const styles = {
  container: {
      backgroundImage: `url(${backgroundImage})`,
       backgroundSize: 'cover',
      backgroundPosition: 'center',
      justifyContent: 'space-between',
      
      width: '100%',
      height: '100vh',
  }

};