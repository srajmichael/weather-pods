import React from 'react';
import WeatherPod from './WeatherPod';
import AddWeatherLocationForm from './AddWeatherLocationForm';
import SaveLocationsButton from './SaveLocationsButton';

class WeatherPodsContainer extends React.Component{
    state = {
        storedLocations: [],
        locationsData: [],
        errorMessage: ''
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

    getLocalStorageVariable(){
        return 'weatherpods-locations';
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

    handleLocationWeatherData = ({current=null, location=null}={}) => {
        if(current && location){
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
                    locationsData: arr,
                    errorMessage: ''
                }
            })
        }else{
            this.setState({
                errorMessage: 'No information available for text provided'
            })
        }
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

    addLocation = (locationInput) => {
        this.fetchSingleLocationWeather(locationInput)
    }

    removeLocation = (locationKey) => {
        this.setState((prevState)=>{
            return{
                locationsData: prevState.locationsData.filter(item => {return item.locationKey !== locationKey})
            }
        })
    }

    saveLocations = () => {
        const locationKeys = this.state.locationsData.map(loc => loc.locationKey);
        localStorage.setItem(this.getLocalStorageVariable(), JSON.stringify(locationKeys))
    }
 
    loadSavedLocations = () => {
        const storedLocations = localStorage.getItem(this.getLocalStorageVariable());
        if(storedLocations){
            return JSON.parse(storedLocations);
        }
        return ['Washington_District of Columbia'];
    }



    componentDidMount(){
        this.fetchMultipleLocationsWeather(this.loadSavedLocations());
    }


    render(){
        return(
            <React.Fragment>
                <div className='weather-pods-container'>
                    {
                        this.state.locationsData.map(locWeatherData => (
                            <WeatherPod key={locWeatherData.locationKey} weatherData={locWeatherData} removeLocation={this.removeLocation}/>
                        ))
                    }
                </div>
                { this.state.errorMessage && <div className='weather-error'>{this.state.errorMessage}</div>}
                <AddWeatherLocationForm addLocation={this.addLocation}/>
                <SaveLocationsButton saveLocationsHandler={this.saveLocations}/>
            </React.Fragment>
        )
    }


}

export default WeatherPodsContainer;