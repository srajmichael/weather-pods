import React from 'react'


const WeatherPod = ({weatherData}) => {
    const {locationText = '', 
        weatherIcon = null, 
        description = '', 
        temperature = 0,
        time = ''
    } = weatherData;
    return(
        <div className='weather-pod'>
            <h3 className='weather-location'>{locationText}</h3>
            <p className='weather-temp'>{temperature + '\u00BA' +' F'}</p>
            {weatherIcon && <img src={weatherIcon}/>}
            <p className='weather-time'>Current Time: {time}</p>
            <p className='weather-desc'>{description}</p>
        </div>
    )
}


export default WeatherPod;