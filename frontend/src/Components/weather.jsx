import React, { useState, useEffect } from 'react';
import './weather.css';
import Condition from './condition';
import axios from 'axios';
import SunIcon from './Assets/sun-svgrepo-com.svg';
import api from '../api'

function Weather({ selectedLocation, locations, setSelectedLocation, setLocations, mean }) {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    // Fetch weather data for the selected location
    const fetchWeatherData = (location) => {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=52b5937a089af02356f7af883d9ec6bf&units=metric`;
        axios.get(weatherURL).then((response) => {
            setData(response.data);
        });
    };

    const updateLocation = async (location) => {
        try {
            const response = await api.post('/api/location/', { 'location': location });
            setSelectedLocation(location)
        } catch (error) {
            console.error('Error updating location:', error);
        }
    };

    const onRemoveLocation = (locToRemove) => {
        setLocations(locations.filter(loc => loc !== locToRemove));
    };

    // Fetch data for the default location when the component mounts
    useEffect(() => {
        fetchWeatherData(selectedLocation);
    }, [selectedLocation]);

    const searchLocation = (event) => {
        if (event.key === 'Enter' && location) {
            fetchWeatherData(location);
            
            // Update locations array by adding the searched location at the beginning and removing the last element
            setLocations((prevLocations) => {
                const updatedLocations = [location, ...prevLocations.filter((loc) => loc.toLowerCase() !== location.toLowerCase())];
                return updatedLocations.slice(0, 4); // Keep only the first 5 locations
            });
            updateLocation(location)
            setLocation(''); // Clear the input field
        }
    };

    return (
        <div className='weather' style={styles.weather}>
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
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyUp={searchLocation}
                    style={styles.searchInput}
                />

                <div style={styles.locationButtons}>
                    {locations.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => setSelectedLocation(loc)}
                            style={{
                                ...styles.locationButton,
                                backgroundColor: selectedLocation === loc ? '#e5e5d4' : '#f1f1f1',
                                fontWeight: selectedLocation === loc ? 'bold' : 'normal',
                                boxShadow: selectedLocation === loc ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
                            }}
                        >
                            <span style={styles.locationText}>
                            {loc === "Colombo" && (
                                <span role="img" aria-label="home" style={styles.icon}>
                                    🏠
                                </span>
                            )}
                            
                                {loc}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveLocation(loc);
                                }}
                                style={styles.closeButton}
                                >
                                    ✖️
                            </button>
                        </button>
                    ))}
                </div>
            </div>

            {/* Weather component display */}
            <div className='weatherComponent'>
                <div className='row1'>
                    <div className='c1'>
                        <p className='locationText'>{data.name}</p>
                        <p className='subText'>Solar radiation</p>
                        <p className='subText'>{new Date().toISOString().split('T')[0]}</p>
                    </div>
                    <div className='c2'>
                        <div className='description'>
                            <img src={SunIcon} alt="sun icon" className='icon' />
                        </div>
                        <div className='solar'>
                            {data.main ? <h1 className='solarText'>{mean} W/m²</h1> : null}
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;

const styles = {
    weather: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        borderRadius: '10px',
        margin: '10px 10px',
        paddingBottom: '10px',
        width: '100%',
        marginTop: '0',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        borderRadius: '10px',
        width: '100%',
        margin: '0 0',
        paddingBottom: '10px',
        paddingTop: '10px',
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
        marginLeft: '20px',
        marginTop:'0',
        outline: 'none',
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: '94%',
    },
    locationButtons: {
        display: 'flex',
        marginTop: '10px',
        marginBottom: '10px',
        flexWrap: 'wrap',
        width: '100%',
    },
    locationButton: {
        // display: 'flex',
        padding: '6px 3px',
        margin: '2px',
        fontSize: '13px',
        borderRadius: '20px',
        height: '40px',
        width: '24%',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        color: 'black',
        position: 'relative',
        allignItems: 'center',
        lineHeight: '1',
        justifyContent: 'center',
    },
    locationText: {
        whiteSpace: 'nowrap', // Prevents text wrapping
        overflow: 'hidden', // Hides overflowed text
        textOverflow: 'ellipsis', // Adds "..." for truncated text
        maxWidth: '30%', // Set maximum width for text container
        lineHeight: '1',
        // display: 'block', // Space between text and close button
        marginRight: '5px',
    },
    icon: {
        marginRight: '5px',
        width: '5px', // fixed width
        height: '5px',
    },
    closeButton: {
        fontSize: '12px', // small font size
        backgroundColor: 'transparent', // no background color
        border: 'none', // no border
        cursor: 'pointer',
        padding: '2px', // small padding to reduce size
        // marginLeft: '2px', // small margin to separate from text
        width: '5px', // fixed width
        height: '5px', // fixed height
        lineHeight: '1', // makes sure button content is vertically centered
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
};
