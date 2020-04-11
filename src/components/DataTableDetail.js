import React, { Component } from 'react';
import "../css/dataTable.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { savePlaceToTrip } from "../actions/placesActions";
import { deletePlace } from "../actions/placesDbActions";

class DataTableDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [{
                name: '',
                delete: ''
            }]
        }
    }

    onDeleteClick = (latitude, longitude, tripIdentifier) => {
        this.props.deletePlace(latitude, longitude, tripIdentifier);
        console.log(this.props)
    };

    renderTableHeader() {
        let header = Object.keys(this.state.headers[0])
        return header.map((key, index) => {
            return <th key={index} style={{ backgroundColor: "#003554" }}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        const { placesFromDb } = this.props.props.placesFromDb;
        return placesFromDb.map((item, index) => {
            return (
                <tr key={index}>
                    <td id='name'>{item.title} - {item.distance}m</td>
                    <button class="fas fa-minus-circle" onClick={this.onDeleteClick.bind(this,
                        item.latitude,
                        item.longitude,
                        this.props.props.trip.trip.tripIdentifier)}>
                    </button>
                </tr>
            )
        })
    }

    render() {
        return (
            <div style={{ height: "500px", marginTop: "25px" }}>
                <h1 id='title'>Your chosen places</h1>
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

DataTableDetail.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    deletePlace: PropTypes.func.isRequired
};

export default connect(
    null,
    { savePlaceToTrip, deletePlace }
)(DataTableDetail);