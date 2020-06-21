import React from 'react'


const WeatherPod = ({weatherData, removeLocation}) => {
    const {locationText = '', 
        weatherIcon = null, 
        description = '', 
        temperature = 0,
        time = '',
        locationKey
    } = weatherData;
    const localTime = new Date(time).toLocaleTimeString();
    const ending = localTime.split(' ')[1];
    const starting = localTime.split(':').reduce((str, value, index) => {
        if(index === 1){
            return str + ':'+ value;
        }
        return str;
    });

    const timeFormatted = starting+ending;
    return(
        <div className='weather-pod'>
            <h3 className='weather-location'>{locationText}</h3>
            <div className='weather-temp-container'>
                <p className='weather-temp'>{temperature + '\u00BA' +' F'}</p>
                <div className='weather-icon-side'>
                    {weatherIcon && <div className='weather-icon-container'><img src={weatherIcon}/></div>}
                </div>
            </div>
            <p className='weather-desc'>{description}</p>
            <p className='weather-time'>As of: {timeFormatted}</p>
            <p className='weather-delete' onClick={()=>{removeLocation(locationKey)}}>x</p>
        </div>
    )
}


export default WeatherPod;