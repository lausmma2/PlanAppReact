import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTripGroups } from "../../actions/tripGroupActions";
import { Link } from "react-router-dom";
import { deleteTripGroup, addUserToTripGroup, getTripGroup } from "../../actions/tripGroupActions";
import { getTripsByTripGroupIdentifier } from "../../actions/tripActions";
import { Button } from "reactstrap";
import Modal from 'react-awesome-modal';
import { getUsersInfo } from "../../actions/userActions";

class TripGroupDashboardItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTripGroupCreator: null,
            username: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.props.props.security.user.username === this.props.tripGroup.tripGroupCreator) {
            this.setState({
                isTripGroupCreator: true
            })
        } else {
            this.setState({
                isTripGroupCreator: false
            })
        }
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    onDeleteClick = id => {
        this.props.deleteTripGroup(id);
    }

    onEditClick = id => {
        this.props.getTripGroup(id, this.props.props.history);
    }

    onDetailClick = id => {
        this.props.getTripsByTripGroupIdentifier(id, this.props.props.history);
    }


    onSubmit(e) {
        e.preventDefault();
        this.props.addUserToTripGroup(this.props.tripGroup.tripGroupIdentifier, this.state.username, this.props.props.history);
        this.closeModal();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { tripGroup } = this.props;
        return (
            <div className="container">
                {this.state.isTripGroupCreator ? (
                    <div className="card card-body bg-light mb-4">
                        <div className="row">
                            <div className="col-sm-2">
                                <span className="card-subtitle mb-2 text-muted" style={{ fontFamily: "Times New Roman" }}>{tripGroup.tripGroupIdentifier}</span>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-2">
                                <h3 style={{ fontFamily: "Times New Roman" }}>{tripGroup.name}</h3>
                                <p style={{ fontFamily: "Times New Roman" }}>{tripGroup.description}</p>
                            </div>
                            <div className="col-md-4 col-sm-8 col-lg-4 d-lg-block" >
                                <ul className="list-group">
                                    <a>
                                        <li className="list-group-item board" onClick={this.onDetailClick.bind(this, tripGroup.tripGroupIdentifier)}>
                                            <span className="fas fa-info-circle" style={{ color: "#1C7C54" }}><span style={{ fontFamily: "Times New Roman" }}> Trips</span></span>
                                        </li>
                                    </a>
                                    <a>
                                        <li className="list-group-item board" onClick={() => this.openModal()}>
                                            <span className="fas fa-user-plus" style={{ color: "#324A5F" }}><span style={{ fontFamily: "Times New Roman" }}> Add user to Group</span></span>
                                        </li>
                                    </a>
                                    <Modal visible={this.state.visible} width="400" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                        <div style={{ margin: "10px" }}>
                                            <h4>Add User to TripGroup: {tripGroup.tripGroupIdentifier}</h4>
                                            <form onSubmit={this.onSubmit}>
                                                <input
                                                    style={{ marginTop: "10px", width: "60%" }}
                                                    type="email"
                                                    placeholder="Email Address (Username)"
                                                    value={this.state.username}
                                                    onChange={this.onChange}
                                                    name="username"
                                                />
                                                <Button
                                                    className="btn-round"
                                                    color="primary"
                                                    type="submit"
                                                    style={{ backgroundColor: "#003554", marginLeft: "5%" }}
                                                >
                                                    Odeslat
                                        </Button>
                                            </form>
                                        </div>
                                        <div style={{ marginTop: "10%", marginLeft: "3%" }}>
                                            <Button
                                                href="javascript:void(0);"
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                                style={{ backgroundColor: "#003554" }}
                                                onClick={() => this.closeModal()}
                                            >
                                                Close
                        </Button>
                                        </div>
                                    </Modal>
                                    <Link to={`/update-trip-group/${tripGroup.tripGroupIdentifier}`}>
                                        <li className="list-group-item update" onClick={this.onEditClick.bind(this, tripGroup.tripGroupIdentifier)}>
                                            <span className="fas fa-edit" style={{ color: "#0582CA" }} title="Update Group"><span style={{ fontFamily: "Times New Roman" }}> Edit Group</span></span>
                                        </li>
                                    </Link>
                                    <li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, tripGroup.tripGroupIdentifier)}>
                                        <span className="fa fa-trash-alt" style={{ color: "red" }} title="Delete Group"><span style={{ fontFamily: "Times New Roman" }}> Delete Group</span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className="card card-body bg-light mb-4">
                            <div className="row">
                                <div className="col-sm-2">
                                    <span className="card-subtitle mb-2 text-muted" style={{ fontFamily: "Times New Roman" }}>{tripGroup.tripGroupIdentifier}</span>
                                </div>
                                <div className="col-lg-6 col-md-4 col-sm-2">
                                    <h3 style={{ fontFamily: "Times New Roman" }}>{tripGroup.name}</h3>
                                    <p style={{ fontFamily: "Times New Roman" }}>{tripGroup.description}</p>
                                </div>
                                <div className="col-md-4 col-sm-8 col-lg-4 d-lg-block" >
                                    <ul className="list-group">
                                        <a>
                                            <li className="list-group-item board" onClick={this.onDetailClick.bind(this, tripGroup.tripGroupIdentifier)}>
                                                <span className="fas fa-info-circle" style={{ color: "#1C7C54" }}><span style={{ fontFamily: "Times New Roman" }}> Trips</span></span>
                                            </li>
                                        </a>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

            </div >
        )
    }
}

TripGroupDashboardItem.propTypes = {
    //tripGroup: PropTypes.object.isRequired,
    getTripGroups: PropTypes.func.isRequired,
    placesFromDb: PropTypes.object.isRequired,
    getTripsByTripGroupIdentifier: PropTypes.func.isRequired,
    addUserToTripGroup: PropTypes.func.isRequired,
    getTripGroup: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    placesFromDb: state.placesFromDb
});

export default connect(mapStateToProps, {
    deleteTripGroup, getUsersInfo, getTripGroups,
    getTripGroup, getTripsByTripGroupIdentifier, addUserToTripGroup
})
    (TripGroupDashboardItem);