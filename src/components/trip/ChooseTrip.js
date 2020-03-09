import React, { Component } from 'react';

class ChooseTrip extends Component {
    render() {
        const place = this.props.place;
        return (
            <div className="card" style={{ width: "14rem" }}>
                <img className="card-img-top" src={require("../../images/cina.jpg")} alt="Cina"></img>
                <div className="card-body">
                    <h5 className="card-title">{place.title}</h5>
                    <p className="card-text">{place.vicinity}</p>
                    <button className="btn btn-primary">Add to trip</button>
                </div>
            </ div>
        )
    }
}

export default ChooseTrip;