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




// class WeatherPod extends React.Component{
//     state = {
//         loading: false,
//         location: 'Not Yet Available',
//         temp: 0,
//         time: '8:56am',
//         description: '',
//         weatherIcon: ''

//     }

//     handleMapsResponse = (data) => {
//         const location = data.features[0];
//         const locationText = location.place_name;
//         const coords = location.geometry.coordinates.reverse();
//         this.setState({location: locationText})
//         this.fetchWeather(locationText);
//     }

//     handleWeatherResponse = (data) => {
//         const icon = data.current.weather_icons[0];
//         const temp = data.current.temperature;
//         const desc = data.current.weather_descriptions[0];
        
//         this.setState({
//             weatherIcon: icon,
//             temp,
//             description: desc
//         })
//     }

//     fetchWeather = (location) => {
//         let weatherAPIKey = '278a55cec6e22434abcec0f5218794ca';
//         let url = `http://api.weatherstack.com/current?access_key=${weatherAPIKey}&query=${location}&units=f`;
//         fetch(url)
//         .then(resp=>resp.json())
//         .then(this.handleWeatherResponse)
//         .catch((err)=>{console.log(err)})
//     }

//     fetchMapInfo = () => {
//         let mapAPIKey = 'pk.eyJ1Ijoic3Jham1pY2hhZWwiLCJhIjoiY2s1NGxycnA2MGt2bjNtbWc1Z21jcjhxZCJ9.RbgjWLzCxEOEFRURytrF2Q';
//         let location = 'mentor oh';
//         let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapAPIKey}`;
        
//         fetch(url)
//         .then(resp=>resp.json())
//         .then(this.handleMapsResponse)
//     }

//     componentDidMount(){
//         this.fetchMapInfo();
//     }

//     render(){
//         return(
//             <div className='weather-pod'>
//                 <h3 className='weather-location'>{this.state.location}</h3>
//                 <p className='weather-temp'>{this.state.temp + '\u00BA' +' F'}</p>
//                 {this.state.weatherIcon && <img src={this.state.weatherIcon}/>}
//                 <p className='weather-time'>Current Time: 8:56am</p>
//                 <p className='weather-desc'>Partially Cloudy</p>
//             </div>
//         )
//     }



// }


export default WeatherPod;