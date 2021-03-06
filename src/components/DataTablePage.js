import React, { Component } from 'react';
import "../css/dataTable.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { savePlaceToTrip, getPlacesFromAPI } from "../actions/placesActions";
import { getAllPlacesAfterAdd } from "../actions/placesDbActions";
import { getUsersLocation } from "../actions/locationActions";

//Expresses table in choosing places page
class TablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [{
                name: '',
                add: ''
            }],
            disabledButtons: [], //to disable already chosen places
            numberOfChosenPlaces: props.placesFromDb.placesFromDb.length + 1 //to count chosen places
        }
    }

    //get user's coords and places stored in the database => checking number of places
    componentDidMount() {
        this.props.getUsersLocation();
        this.props.getAllPlacesAfterAdd(this.props.props.match.params.tripId);
        this.setState({
            disabledButtons: new Array(100).fill(false)
        })
        if (this.state.numberOfChosenPlaces >= 10) {
            this.setState({
                disabledButtons: Array(100).fill(true)
            })
        }
    }

    //clicking on place's choose button => disabling buttons and checking how many places is already stored
    onClick(title, latitude, longitude, distance, tripIdentifier, index) {
        this.setState(oldState => {
            const newDisabledButtons = [...oldState.disabledButtons]
            newDisabledButtons[index] = true;
            return {
                disabledButtons: newDisabledButtons,
                numberOfChosenPlaces: oldState.numberOfChosenPlaces + 1
            }
        })
        if (this.state.numberOfChosenPlaces >= 10) {
            this.setState({
                disabledButtons: Array(100).fill(true)
            })
        }
        this.props.savePlaceToTrip(title, latitude, longitude, distance, tripIdentifier);
    }

    //rendering header of the table
    renderTableHeader() {
        let header = Object.keys(this.state.headers[0])
        return header.map((key, index) => {
            return <th key={index} style={{ backgroundColor: "#003554" }}>{key.toUpperCase()}</th>
        })
    }

    //rendering body of the table
    renderTableData() {
        const { items } = this.props.props.places.places.results;
        return items.map((item, index) => {
            return (
                <tr key={index}>
                    <td id='name'>{item.title} - {item.distance}m</td>
                    <button className="fas fa-check" onClick={this.onClick.bind(this, item.title,
                        item.position[0],
                        item.position[1],
                        item.distance,
                        this.props.props.match.params.tripId, index
                    )}
                        disabled={this.state.disabledButtons[index]}
                    >
                    </button>
                </tr>
            )
        })
    }

    render() {
        return (
            <div style={{ height: "500px", marginTop: "25px" }}>
                <h1 id='title'>Found places</h1>
                <table id='items'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
};

//Exports range of validators that can be used to make sure the recieved data is valid
TablePage.propTypes = {
    placesFromDb: PropTypes.object.isRequired,
    getAllPlacesAfterAdd: PropTypes.func.isRequired,
    getUsersLocation: PropTypes.func.isRequired,
    places: PropTypes.object.isRequired,
    getPlacesFromAPI: PropTypes.func.isRequired
};

//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
    placesFromDb: state.placesFromDb,
    places: state.places,
    coords: state.coords
})

export default connect(
    mapStateToProps,
    { savePlaceToTrip, getAllPlacesAfterAdd, getUsersLocation, getPlacesFromAPI }
)(TablePage);