import React from 'react';
import { Link } from "react-router-dom";

const CreateGroupButton = () => {
    return (
        <React.Fragment>
            <Link to="/add-trip-group" className="btn btn-lg btn-info" style={{ backgroundColor: "#003554", fontFamily: "Arial" }}>
                Create a Group
            </Link>
        </React.Fragment>
    )
}

export default CreateGroupButton;