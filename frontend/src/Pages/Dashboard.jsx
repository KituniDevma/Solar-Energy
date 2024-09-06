import react, { useState, useEffect } from "react";
import backgroundImage from '../Components/Assets/Background.png';
import Header from "../Components/header";
import Weather from "../Components/weather";
import SolarChart from "../Components/LineChart";
import EnergyCal from "../Components/EnergyCal";
import api from "../api";
import { set } from "date-fns";

function DashboardPage() {
  const [selectedLocation, setSelectedLocation] = useState("Colombo");
  const [locations, setLocations] = useState(["Colombo", "Gampaha", "Galle", "Kandy", "Jaffna"]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (location) => {
    try {
        const url = `http://127.0.0.1:8000/api/weather/?location=${location}`
        const response = await fetch(url)
        if (response.ok) {
            predict()
        }
        else {
            const err = response.error
            console.error('Error fetching data:', err);
        }
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
  }

  const predict = async () => {
    try {
        const url = `http://127.0.0.1:8000/api/model/`
        const response = await fetch(url)
        if (!response.ok) {
            const err = response.error
            console.error('Error predicting:', err )
        }
        else {
            setLoading(false)
        }
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
  }

  useEffect(() => {
    setLoading(true)
    console.log(selectedLocation)
    fetchData(selectedLocation)
}, [selectedLocation]);
  
  // const getLocation = () => {
  //   api
  //     .get("/api/location/")
  //     .then((res) => {
  //       setLocation(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => alert(err));
  // }

  // const deleteLocation = (id) => {
  //   api
  //     .delete(`/api/location/delete/${id}/`)
  //     .then((res) => {
  //       if (res.status === 204) alert('Location deleted successfully!');
  //       else alert('Failed to delete location');
  //       getLocation();
  //     })
  //     .catch((err) => alert(err));
  // }

  // const addLocation = (e) => {
  //   e.preventDefault()
  //   api
  //     .post("/api/location/", { name })
  //     .then((res) => {
  //       if (res.status === 201) alert('Location added successfully!');
  //       else alert('Failed to add location');
  //       getLocation();
  //       setName('');
  //     })
  //     .catch((err) => alert(err));
  // }

  if (loading) {
    return (
      <div style={styles.container}>
        <Header />
        <div>Loading...</div>
      </div>
    )
  } else {
    return (
      <div style={styles.container}>
        <Header />
        <div style={styles.content}>
          <div style={styles.col1}>
            <Weather selectedLocation={selectedLocation} locations={locations} setSelectedLocation={setSelectedLocation} setLocations={setLocations}/>
            <EnergyCal />
          </div>
          <div style={styles.col2}>
            <SolarChart />
          </div>
        </div>
      </div>
    );
  }

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
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '20px',
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
  },
};
