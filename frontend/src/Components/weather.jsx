import React,{ useContext }  from 'react';
import './weather.css';
import Condition from './condition';
import axios from 'axios';
import { DataContext } from "./DataContext";

 
 function Weather() {

    const weatherComponentStyle = {
         maxWidth: '300px',
        backgroundColor: 'rgb(249, 190, 62)',
        padding: '15px',
        borderRadius: '10px',
        margin: '10px',
        diaplay: 'flex',
        
        
         
    };

    const { data, location } = useContext(DataContext);


    // const searchLocation = (event) =>{
    //     if(event.key === 'Enter'){
    //         const weatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=52b5937a089af02356f7af883d9ec6bf`;

    //         axios.get(weatherURL).then((response)=>{
    //             console.log(response.data)
    //             setData(response.data)
    //         })
    //         setLocation('')
            
    //     }
        
    // }


    

    return(
        <div className='weatherComponent' style={weatherComponentStyle}>
            {/* <div className='search'  > 
                <input 
                    type='text'
                    value={location}
                    placeholder='Enter Location'
                    onChange={event => setLocation(event.target.value)}
                    onKeyUp={searchLocation}
                    >

                    </input>
                 
            </div> */}
        {/* top half */}
       
        <div className='top'>

          
            
          <div className='location'>
            <p className='locationText'>{data.name}</p>
          </div>
        
         
            
        <div className='secondColumn'>
        <div className='temp'>
            {data.main? <h1 className='tempText'>{data.main.temp} F</h1> : null}          
            
            
          </div>
          <div className='description'>
          
          {data.weather? <h1 className='desText'>{data.weather[0].main}</h1> : null}          
          </div>

        </div>

        


         
        </div>
        {/* /////////////////////////////////////////// */}

        {/* bottom half */}
        <div className='bottom'>
         
          <div classsName='humidity'>
            <Condition attributeName="Humidity" attributeValue=  {data.main? data.main.humidity : null}  unit="%"/>
          </div>
          <div className='pressure'>
          <Condition attributeName="Pressure" attributeValue= {data.main? data.main.pressure : null} unit="Pa"/>
          </div>
          <div className='wind speed'>
          <Condition attributeName="Wind Speed" attributeValue={data.wind? data.wind.speed : null} unit="kmph"/>
          </div>
          <div className='visibility'>
          <Condition attributeName="Visibility" attributeValue={data.main? data.visibility : null} unit="m"/>
          </div>
          

        </div>

        </div>  
      
    )
}

export default Weather;