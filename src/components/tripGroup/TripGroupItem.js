import React, { Component } from 'react';
import { deleteTripGroup, getTripGroup, addUserToTripGroup } from "../../actions/tripGroupActions";
import { getTripsByTripGroupIdentifier } from "../../actions/tripActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Row, Col } from "reactstrap";
import Modal from 'react-awesome-modal';

class TripGroupItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTripGroupCreator: true,
            username: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.props.userData.userData.username === this.props.tripGroup.tripGroupCreator) {
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
            <div>
                <li>
                    <Row>
                        <Col md="2" xs="3">
                            <div className="avatar">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("../../images/group3.png")}
                                />
                            </div>
                        </Col>
                        <Col md="4" xs="3">
                            {tripGroup.name} <br />
                            <span className="text-muted">
                                <small>{tripGroup.tripGroupIdentifier}</small>
                            </span>
                        </Col>
                        <Col md="3" xs="6">
                            <a
                                className="btn btn-circle btn-md"
                                outline="true"
                                size="md"
                                title="Show trips"
                                onClick={this.onDetailClick.bind(this, tripGroup.tripGroupIdentifier)}

                            >
                                <i className="fas fa-directions" />
                            </a>
                            <button
                                className="btn btn-circle btn-md"
                                outline="true"
                                size="md"
                                title="Show trips"
                                onClick={() => this.openModal()}
                                disabled={this.state.isTripGroupCreator}
                            >
                                <i className="fas fa-user-plus" />
                            </button>
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
                        </Col>
                        <Col md="3" xs="6">
                            <button
                                className="btn btn-circle btn-md"
                                outline="true"
                                size="sm"
                                title="Edit group"
                                onClick={this.onEditClick.bind(this, tripGroup.tripGroupIdentifier)}
                                disabled={this.state.isTripGroupCreator}
                            >
                                <i className="far fa-edit" />
                            </button>
                            <Button
                                className="btn btn-danger btn-circle btn-lg"
                                color="white"
                                outline
                                size="sm"
                                title="Delete group"
                                onClick={this.onDeleteClick.bind(this, tripGroup.tripGroupIdentifier)}
                                disabled={this.state.isTripGroupCreator}
                            >
                                <i className="fa fa-times" />
                            </Button>
                        </Col>
                    </Row>
                </li>
            </div >
        )
    }
}

TripGroupItem.propTypes = {
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getTripGroup: PropTypes.func.isRequired,
    getTripsByTripGroupIdentifier: PropTypes.func.isRequired,
    addUserToTripGroup: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})

export default connect(mapStateToProps,
    { deleteTripGroup, getTripGroup, getTripsByTripGroupIdentifier, addUserToTripGroup }
)(TripGroupItem);
