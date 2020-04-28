import React, { Component } from 'react';
import "../css/dataTable.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { savePlaceToTrip } from "../actions/placesActions";
import { deletePlace, getAllPlaces } from "../actions/placesDbActions";

//Expresses table in trip detail => containts stored places in the specific trip
class DataTableDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [{
                name: '',
                delete: ''
            }],
            test: "test"
        }
    }
    //after component mounts => returns all stored places
    componentDidMount() {
        this.props.getAllPlaces(this.props.props.match.params.id, this.props.props.history)
    }

    //on delete button clicking => clicked place will be deleted
    onDeleteClick = (latitude, longitude, tripIdentifier) => {
        this.props.deletePlace(latitude, longitude, tripIdentifier);
    };

    //method to render header of the table
    renderTableHeader() {
        let header = Object.keys(this.state.headers[0])
        return header.map((key, index) => {
            return <th key={index} style={{ backgroundColor: "#003554" }}>{key.toUpperCase()}</th>
        })
    }

    //method to render table body
    renderTableData() {
        const { placesFromDb } = this.props.props.placesFromDb;
        return placesFromDb.map((item, index) => {
            return (
                <tr key={index}>
                    <td id='name'>{item.title} - {item.distance}m</td>
                    <button
                        className="fas fa-minus-circle"
                        onClick={this.onDeleteClick.bind(this,
                            item.latitude,
                            item.longitude,
                            this.props.props.match.params.id)}>
                    </button>
                </tr>
            )
        })
    }

    render() {
        return (
            <div style={{ height: "500px", marginTop: "15%" }}>
                <h1 id='title'>Chosen places</h1>
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
DataTableDetail.propTypes = {
    deletePlace: PropTypes.func.isRequired
};

export default connect(
    null,
    { savePlaceToTrip, deletePlace, getAllPlaces }
)(DataTableDetail);