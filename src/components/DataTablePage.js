import React, { Component } from 'react';
import "../css/dataTable.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { savePlaceToTrip } from "../actions/placesActions";

class TablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [{
                name: '',
                add: ''
            }],
            disabledButtons: []
        }
    }

    componentDidMount() {
        this.setState({
            disabledButtons: new Array(100).fill(false)
        })
        //console.log(this.props)
    }

    onClick(title, latitude, longitude, distance, tripIdentifier, index) {
        this.props.savePlaceToTrip(title, latitude, longitude, distance, tripIdentifier);
        this.setState(oldState => {
            const newDisabledButtons = [...oldState.disabledButtons]
            newDisabledButtons[index] = true;
            return {
                disabledButtons: newDisabledButtons,
            }
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.headers[0])
        return header.map((key, index) => {
            return <th key={index} style={{ backgroundColor: "#003554" }}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        const { items } = this.props.props.places.places.results;
        return items.map((item, index) => {
            return (
                <tr key={index}>
                    <td id='name'>{item.title} - {item.distance}m</td>
                    <button class="fas fa-check" onClick={this.onClick.bind(this, item.title,
                        item.position[0],
                        item.position[1],
                        item.distance,
                        this.props.props.trip.trip.tripIdentifier, index
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
            <div style={{ height: "500px" }}>
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

TablePage.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

export default connect(
    null,
    { savePlaceToTrip }
)(TablePage);