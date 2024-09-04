import React, { useState } from "react";
import backgroundImage from '../Components/Assets/Background.png';
import { Link } from "react-router-dom";
import Header from "../Components/header";
import Weather from "../Components/weather";
import Forecast from "../Components/forecast";
import EnergyCal from "../Components/EnergyCal";

function DashboardPage() {
  return (
    <div style={styles.container}>
      <Forecast/>
      <Header />
      <Weather />
      <EnergyCal />
      
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