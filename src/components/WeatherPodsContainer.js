import React from 'react';
import WeatherPod from './WeatherPod';
import AddWeatherLocationForm from './AddWeatherLocationForm';

class WeatherPodsContainer extends React.Component{
    state = {
        initalLocations: [
            'Washington_District of Columbia'
        ],
        locationsData: []
    }

    getApiKey(){
        return '278a55cec6e22434abcec0f5218794ca';
    }

    getWeatherUrl(){
        return `http://api.weatherstack.com/current?access_key=${this.getApiKey()}`;
    }

    getLocationNameRegionSeparator(){
        return '_';
    }

    updatedLocationsDataBeforeSetState = (newData, prevState) => {
        let locationText = newData.locationText;
        let found = false;
        let arr = prevState.locationsData.map((loc)=>{
            if(loc.locationText === locationText){
                found = true;
                return newData;
            }
            return loc;
        })
        if(!found){
            arr.push(newData);
        }
        
        return arr;
    }

    handleLocationWeatherData = ({current, location}) => {
        let locationKey = location.name + this.getLocationNameRegionSeparator() + location.region;
        let newData = {
            locationKey,
            locationText: location.name + ', ' + location.region,
            weatherIcon: current.weather_icons[0],
            description: current.weather_descriptions[0],
            temperature: current.temperature,
            time: location.localtime
        }
        this.setState((prevState)=>{
            let arr = this.updatedLocationsDataBeforeSetState(newData,prevState);
            return {
                locationsData: arr
            }
        })
    }

    fetchSingleLocationWeather = (locationText) => {
        let url = `${this.getWeatherUrl()}&query=${locationText}&units=f`;
        fetch(url)
        .then(resp=>resp.json())
        .then(this.handleLocationWeatherData)
        .catch(err=>{console.log(err)})
    }

    fetchMultipleLocationsWeather = (locationsTextArray) => {
        for(let i = 0; i < locationsTextArray.length; i++){
            const searchString = locationsTextArray[i].split(this.getLocationNameRegionSeparator()).join(' ');
            this.fetchSingleLocationWeather(searchString)
        }
    }

    addLocation = (locationInput) => {
        this.fetchSingleLocationWeather(locationInput)
    }



    //***not supported with current weather plan***
    // fetchMultipleLocationsWeather = (locationsTextArray) => {
    //     let weatherAPIKey = '278a55cec6e22434abcec0f5218794ca';
    //     let queryString = locationsTextArray.join(';');
    //     let url = `http://api.weatherstack.com/current?access_key=${weatherAPIKey}&query=${queryString}&units=f`;
    //     fetch(url)
    //     .then(resp=>resp.json())
    //     .then(this.handleFetchedLocations)
    //     .catch(err=>{console.log(err)})
    // }



    componentDidMount(){
        this.fetchMultipleLocationsWeather(this.state.initalLocations);
    }


    render(){
        return(
            <div>
                {
                    this.state.locationsData.map(locWeatherData => (
                        <WeatherPod key={locWeatherData.locationKey} weatherData={locWeatherData}/>
                    ))
                }
                <AddWeatherLocationForm addLocation={this.addLocation}/>
            </div>
        )
    }


}

export default WeatherPodsContainer;