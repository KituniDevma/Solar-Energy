import React, { useState } from "react";
import Logo from './Assets/logo.svg'; // Adjust the path based on your file structure


function Header() {
  return (
    <div style={styles.headerContainer}>
      <div style={styles.logoContainer}>
        <span style={styles.logo}>🌞</span> {/* Sun Icon */}
        <span style={styles.title}>Solar Vision</span>
      </div>
      <div style={styles.navContainer}>
        <img src={Logo} alt="Logo" style={styles.menuIcon} onClick={handleLogout} /> {/* Replaced Hamburger Menu Icon */}
      </div>
    </div>
  );
}

function handleLogout() {
  window.location.href = '/login'; // Redirect to the login page
}


export default Header;

const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 10px',
    backgroundColor: 'transparent',
    color: '#000',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '500',
    maxWidth: '100%',
    width: '100%',
    margin: '0 auto',
    marginBottom: '10px',
    padding: '10px 20px',
    boxSizing: 'border-box',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '33px',
    marginRight: '10px',
  },
  title: {
    fontSize: '26px',
    color: 'orange',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  menuIcon: {
    width: '26px',
    height: '26px',
    cursor: 'pointer',
  },
};