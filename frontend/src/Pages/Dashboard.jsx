import React from "react";
import backgroundImage from '../Components/Assets/Background.png';
import Header from "../Components/header";
import Weather from "../Components/weather";
import EnergyCal from "../Components/EnergyCal";
import StreamlitEmbed from "../Components/StreamlitEmbed";

function DashboardPage() {
  return (
    <div style={styles.container}>
      <Header />
      <Weather />
      <div style={styles.content}>
        <div style={styles.col1}>
         
          <EnergyCal />
        </div>
        {/* <div style={styles.col2}>
          <StreamlitEmbed />
        </div> */}
      </div>
    </div>
  );
}

export default DashboardPage;

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: 'calc(100% - 60px)', // Adjust based on your header height
  },
  col1: {
    flex: 1,
    flexBasis: '20%', // 1/5 of the width
    padding: '10px',
  },
  col2: {
    flex: 4,
    flexBasis: '80%', // 4/5 of the width
    padding: '10px',
  },
};
