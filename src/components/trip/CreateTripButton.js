import React from 'react';
import { Link } from "react-router-dom";

const CreateTripButton = () => {
    return (
        <React.Fragment>
            <Link to="/addTrip" className="btn btn-lg btn-info" style={{ backgroundColor: "#003554", fontFamily: "Arial" }}>
                Create a Trip
            </Link>
        </React.Fragment>
    )
}

export default CreateTripButton;