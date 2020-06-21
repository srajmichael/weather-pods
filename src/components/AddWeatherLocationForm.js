import React from 'react';


class AddWeatherLocationForm extends React.Component{
    state = {
        inputText: ''
    }


    handleInputOnChange = (event) => {
        this.setState({
            inputText: event.target.value
        })
    }

    handleAddLocationAndClearInput = (e) => {
        e.preventDefault()
        this.props.addLocation(this.state.inputText)
        this.setState({inputText:''})
    }


    render(){
        return(
            <form className='add-weather-location-form' onSubmit={this.handleAddLocationAndClearInput}>
                <input className='add-weather-location-input' type='text' value={this.state.inputText} onChange={this.handleInputOnChange}/>
                <button className='add-weather-location-button' onClick={this.handleAddLocationAndClearInput}>Add Location</button>
            </form>
        )
    }
}



export default AddWeatherLocationForm;