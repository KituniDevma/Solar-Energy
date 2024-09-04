import React, { useState } from "react";
 

function Header() {
  return (
    <div style={styles.headerContainer}>
      <div style={styles.logoContainer}>
        <span style={styles.logo}>🌞</span> {/* Sun Icon */}
        <span style={styles.title}>Solar Vision</span>
      </div>
      <div style={styles.navContainer}>
        <a href="#" style={styles.navItem}>Home</a>
        <a href="#" style={styles.navItem}>Support</a>
        <a href="#" style={styles.navItem}>My Account</a>
        <div style={styles.menuIcon}>☰</div> {/* Hamburger Menu Icon */}
      </div>
    </div>
  );
}

export default Header;

const styles = {
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 20px',
        backgroundColor: 'transparent',
        color: '#000', // Default color for text
        fontFamily: 'Arial, sans-serif',
        fontWeight:  '500',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Light shadow
        maxWidth: '100%', // Set max width to 100% of the parent container
        width: '100%', // Make sure the header takes up the full width of the parent container
        margin: '0 auto', // Center the header horizontally
        marginBottom: '10px', // Add some space at the bottom of the header 
        boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
      },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px', // Adjust the size of the sun icon
    marginRight: '8px',
  },
  title: {
    fontSize: '24px',
    color: 'orange',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)', // Add a subtle shadow to the text
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  navItem: {
    margin: '0 15px',
    textDecoration: 'none',
    color: '#000', // Link color
    fontSize: '18px',
    position: 'relative',
  },
  menuIcon: {
    fontSize: '24px',
    cursor: 'pointer',
    marginLeft: '20px',
  },
};
