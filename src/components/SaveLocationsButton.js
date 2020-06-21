import React from 'react'

const SaveLocationsButton = ({saveLocationsHandler}) => (
    <React.Fragment>
        <button onClick={saveLocationsHandler}>Save Locations</button>
    </React.Fragment>
)

export default SaveLocationsButton;