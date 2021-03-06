import React, { Component } from 'react'
import TripGroupDashboardItem from './tripGroup/TripGroupDashboardItem';
import { connect } from "react-redux";
import { getTrips } from "../actions/tripActions";
import { getTripGroups } from "../actions/tripGroupActions";
import PropTypes from "prop-types";
import { getTripTypes } from "../actions/tripTypeActions";
import { getUsersLocation } from "../actions/locationActions";
import { getUsersInfo } from "../actions/userActions";
import CreateGroupButton from './tripGroup/CreateGroupButton';

//Component that expresses main dashboard of groups
class GroupDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            data: [],
        };
    }

    //Check if the token is valid or not => if not => calling all necessary functions
    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        } else {
            this.props.getTrips();
            this.props.getTripGroups();
            this.props.getTripTypes();
            this.props.getUsersLocation();
            this.props.getUsersInfo();
        }
    }

    render() {
        const { tripGroups } = this.props.tripGroup;
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Group Dashboard</h1>
                        <br />
                        <CreateGroupButton />
                        <br />
                        <hr />
                        {tripGroups.map((tripGroup, index) => (
                            <TripGroupDashboardItem key={index} tripGroup={tripGroup} props={this.props} />
                        ))}
                    </div>
                </div>
            </div >
        );
    }
}

//Exports range of validators that can be used to make sure the recieved data is valid
GroupDashboard.propTypes = {
    trip: PropTypes.object.isRequired,
    getTrips: PropTypes.func.isRequired,
    getTripGroups: PropTypes.func.isRequired,
    getTripTypes: PropTypes.func.isRequired,
    coords: PropTypes.object.isRequired,
    getUsersLocation: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
    getUsersInfo: PropTypes.func.isRequired,
    tripGroup: PropTypes.object.isRequired
};

//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
    trip: state.trip,
    tripGroup: state.tripGroups,
    coords: state.coords,
    security: state.security,
    userData: state.userData
});

export default connect(
    mapStateToProps,
    { getTrips, getTripGroups, getTripTypes, getUsersLocation, getUsersInfo }
)(GroupDashboard);