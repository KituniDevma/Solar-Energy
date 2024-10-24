import react, { useState, useEffect } from "react";
import backgroundImage from '../Components/Assets/Background.png';
import sun from '../Components/Assets/sun.webp';
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
  const [locationsLoading, setLocationsLoading] = useState(true)
  const [mean, setMean] = useState(0.0)
  const [sum, setSum] = useState(0.0)
  const [dimensions, setDimensions] = useState([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setLocationsLoading(true)
    getLocation();
    getDimensions();
  }, [])

  useEffect(() => {
    if (counter > 0) {
      setLoading(true)
      getDimensions()
      predict(selectedLocation)
    }
  }, [counter])

  const fetchData = async (location) => {
    try {
        const url = `/api/weather/?location=${location}`
        const response = await api.get(url)
        if (response.status === 200) {
            predict(location)
        }
        else {
            const err = response.error
            console.error('Error fetching data:', err);
        }
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
  }

  const predict = async (location) => {
    try {
        const url = `/api/model/?location=${location}`
        const response = await api.get(url)
        if (response.status =! 200) {
            const err = response.error
            console.error('Error predicting:', err )
        }
        else {
            setMean(response.data.output[0])
            setSum(response.data.output[1])
            setLoading(false)
        }
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
  }

  useEffect(() => {
    if (!locationsLoading && selectedLocation) {
      setLoading(true)
      console.log(selectedLocation)
      fetchData(selectedLocation)
    }
}, [selectedLocation, locationsLoading]);
  
  const getLocation = () => {
    api
      .get("/api/location/")
      .then((res) => {
        setLocations(res.data.locations);
        setSelectedLocation(res.data.locations[0]);
        setLocationsLoading(false);
      })
      .catch((err) => alert(err));
  }

  const getDimensions = () => {
    api
      .get("/api/dimensions/")
      .then((res) => {
        setDimensions(res.data.dimensions);
      })
      .catch((err) => alert(err));
  }

  const dimensionUpdate = async (dimensions) => {
    const response = await api.post("/api/dimensions/", {'dimensions': dimensions})
    if (response.status === 200) {
      console.log('Dimensions updated successfully')
      setCounter(counter + 1)
    }
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <Header />
        <div style={styles.loadingContainer}>
          {/* <img src={sun} alt="Loading" style={styles.loadingImage} /> */}
          <div>Loading...</div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={styles.container}>
        <Header />
        <div style={styles.content}>
          <div style={styles.col1}>
            <Weather selectedLocation={selectedLocation} locations={locations} setSelectedLocation={setSelectedLocation} setLocations={setLocations} mean={mean.toFixed(0)}/>
            <EnergyCal sum={(sum/1000).toFixed(3)} dimensions={dimensions} dimensionsUpdate={dimensionUpdate}/>
          </div>
          <div style={styles.col2}>
            <SolarChart />
          </div>
        </div>
      </div>
    );
  }
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
  loadingImage: {
    marginLeft: '500px',
    marginTop: '170px',
    width: '500px',
    height: '500px',
    marginRight: '10px'
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
