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
      <div style={styles.content}>
        <div style={styles.col1}>
          <Weather />
          <EnergyCal />
        </div>
        <div style={styles.col2}>
          <SolarChart />
        </div>
      </div>
    </div>
  );

  // return (
  //   <div style={styles.container}>
  //     <Header />
  //     <SolarChart />
  //     <Weather />      
  //     <div style={styles.content}>
  //       <div style={styles.col1}>
         
  //         <EnergyCal />
  //       </div>
  //       {/* <div style={styles.col2}>
  //         <SolarChart />
  //       </div> */}
  //     </div>
  //   </div>
  // );
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
    paddingTop:'0',
    marginTop:'0',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '20px',
    paddingTop:'0',
    paddingLeft: '0',
  },
  col1: {
    margin: '20px',
    flex:1,
  },
  col2: {
    margin: 0,
    flex: 2,
    padding: '20px',
    paddingLeft: '0',
    paddingTop:'70px'
  },
};
