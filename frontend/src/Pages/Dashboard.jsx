import react, { useState, useEffect } from "react";
import backgroundImage from '../Components/Assets/Background.png';
import Header from "../Components/header";
import Weather from "../Components/weather";
import SolarChart from "../Components/LineChart";
import EnergyCal from "../Components/EnergyCal";
import api from "../api";

function DashboardPage() {
  const [location, setLocation] = useState([]);
  const [name, setName] = useState('');
  
  const getLocation = () => {
    api
      .get("/api/location/")
      .then((res) => {
        setLocation(res.data);
        console.log(res.data);
      })
      .catch((err) => alert(err));
  }

  // useEffect(() => {
  //   getLocation();
  // }, []);

  const deleteLocation = (id) => {
    api
      .delete(`/api/location/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert('Location deleted successfully!');
        else alert('Failed to delete location');
        getLocation();
      })
      .catch((err) => alert(err));
  }

  const addLocation = (e) => {
    e.preventDefault()
    api
      .post("/api/location/", { name })
      .then((res) => {
        if (res.status === 201) alert('Location added successfully!');
        else alert('Failed to add location');
        getLocation();
        setName('');
      })
      .catch((err) => alert(err));
  }

  return (
    <div style={styles.container}>
      <Header />
      <SolarChart />
      <Weather />      
      <div style={styles.content}>
        <div style={styles.col1}>
         
          <EnergyCal />
        </div>
        {/* <div style={styles.col2}>
          <SolarChart />
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
    flexBasis: '100%', // 1/5 of the width
    padding: '10px',
  },
  col2: {
    flex: 0,
    flexBasis: '80%', // 4/5 of the width
    padding: '10px',
  },
};
