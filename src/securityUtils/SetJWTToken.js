import axios from "axios";

//Set token to header
const SetJWTToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default SetJWTToken;