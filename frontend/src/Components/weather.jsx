import React, { useState } from 'react';
import './weather.css';
import Condition from './condition';
import axios from 'axios';
import SunIcon from './Assets/sun-svgrepo-com.svg';


function Weather() {
    const [selectedLocation, setSelectedLocation] = useState("Colombo");
    const locations = ["Colombo", "Hambantota", "Galle", "Kandy" ];
    
    

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=52b5937a089af02356f7af883d9ec6bf`;
            axios.get(weatherURL).then((response) => {
                console.log(response.data);
                setData(response.data);
            });
            setLocation('');
        }
    }

    return (
        <div>
            <div style={styles.container}>
                <style>
                    {`
                        input::placeholder {
                            color: #888;
                            opacity: 1;
                        }
                    `}
                </style>

                <input
                    type="text"
                    placeholder="Search Location"
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyUp={searchLocation}
                    style={styles.searchInput}
                />

                <div style={styles.locationButtons}>
                    {locations.map((location) => (
                        <button
                            key={location}
                            onClick={() => setSelectedLocation(location)}
                            style={{
                                ...styles.locationButton,
                                backgroundColor: selectedLocation === location ? '#e5e5d4' : '#f1f1f1',
                                fontWeight: selectedLocation === location ? 'bold' : 'normal',
                                boxShadow: selectedLocation === location ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
                            }}
                        >
                            {location === "Colombo" && (
                                <span role="img" aria-label="home" style={styles.icon}>
                                    🏠
                                </span>
                            )}
                            {location}
                        </button>
                    ))}
                </div>
            </div>

            <div className='weatherComponent' >
                <div className='row1'>
                    <div className='c1'>
                    <p className='locationText'>{data.name}</p>
                        <p className='subText'>Solar energy generation</p>
                        <p className='subText'>{new Date().toISOString().split('T')[0]}</p>
                     

                    </div>
                    <div className='c2'>
 
                        <div className='description'>
                        <img src={SunIcon} alt="sun icon" className='icon' />                        </div>
                        <div className='solar'>
                           {data.main ? <h1 className='solarText'>85 kWh/m²</h1> : null}
                        </div>

                    </div>
                    
                     
                </div>

              

                {/* Bottom half */}
                <div className='row3'>
                    <div className='r1'>
                    <div className='attribute'>
                        <Condition attributeName="Temperature" attributeValue={data.main ? data.main.temp : null} unit="°C" />
                    </div>
                    <div className='attribute'>
                        <Condition attributeName="Wind" attributeValue={data.wind ? data.wind.speed : null} unit="km/h" />
                    </div>
                    <div className='attribute'>
                        <Condition attributeName="Humidity" attributeValue={data.main ? data.main.humidity : null} unit="%" />
                    </div>

                    </div>

                    <div className='r2'>
                    <div className='attribute'>
                        <Condition attributeName="Visibility" attributeValue={data.visibility ? (data.visibility / 1000) : null} unit="km" />
                    </div>
                    <div className='attribute'>
                        <Condition attributeName="Pressure" attributeValue={data.main ? data.main.pressure : null} unit="mb" />
                    </div>
                    <div className='attribute'>
                    <Condition 
    attributeName="Dew point" 
    attributeValue={data.main ? Math.round(data.main.temp - ((100 - data.main.humidity) / 5)) : null} 
    unit="°C" 
/>                    </div>

                    </div>
                   
                    
                </div>
            </div>
        </div>
    );
}

export default Weather;

const styles = {
  container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '30px',
      borderRadius: '10px',
      width: '100%',
      margin: '0 auto',
      paddingBottom: '10px',
      boxSizing: 'border-box',
  },
  searchInput: {
      flex: 1,
      padding: '10px 20px',
      fontSize: '16px',
      color: 'black',
      borderRadius: '20px',
      border: '1px solid #ccc',
      marginRight: '20px',
      outline: 'none',
      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      maxWidth: '550px',
  },
  locationButtons: {
      display: 'flex',
      gap: '10px',
  },
  locationButton: {
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '20px',
      height: '50px',
      width: '130px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',      color: 'black',
  },
  icon: {
      marginRight: '8px',
  },
};
