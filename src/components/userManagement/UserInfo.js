import React, { Component } from 'react';
import { getUsersInfo } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../actions/userActions";
import { Link } from "react-router-dom";
import { getTripGroups } from "../../actions/tripGroupActions";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import {
    AvForm,
    AvGroup,
    AvInput,
    AvFeedback,
} from 'availity-reactstrap-validation';
import TripGroupItem from '../tripGroup/TripGroupItem';

class UserInfo extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            phone: "",
            country: "",
            aboutMe: "",
            visible: false,
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        } else {
            this.props.getUsersInfo();
            this.props.getTripGroups();
            this.setState({ ...this.props.userData.userData });
        }
    }

    onSubmit(e) {
        e.persist();
        this.setState({
            isLoading: true
        })

        const updatedUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            country: this.state.country,
            aboutMe: this.state.aboutMe
        };
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1500)
        this.props.updateUser(updatedUser, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { userData } = this.props.userData;
        return (
            <div className="content">
                <Row>
                    <Col md="4">
                        <Card className="card-user">
                            <CardBody>
                                <div className="author">
                                    <a href="#user" onClick={e => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={require("../../images/male.png")}
                                            style={{ height: "350px" }}
                                        />

                                        <h5 className="title" style={{ color: "#003554" }}>{userData.firstname} {userData.lastname}
                                        </h5>
                                    </a>
                                </div>
                                <p className="description text-center">
                                    "I like the way you work it <br />
                                    No diggity <br />I wanna bag it up"
                  </p>
                            </CardBody>
                            <CardFooter>
                                <hr />
                                <div className="button-container">
                                    <Row>
                                        <Col className="ml-auto" lg="3" md="6" xs="6">
                                            <h5>
                                                0 <br />
                                                <small>Places visited</small>
                                            </h5>
                                        </Col>
                                        <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                0 <br />
                                                <small>Kilometers</small>
                                            </h5>
                                        </Col>
                                        <Col className="mr-auto" lg="3">
                                            <h5>
                                                0 Kč <br />
                                                <small>Spent</small>
                                            </h5>
                                        </Col>
                                    </Row>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md="8">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Edit Profile</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <AvForm onSubmit={this.onSubmit}>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <FormGroup>
                                                <label>Visible ID (disabled)</label>
                                                <Input
                                                    disabled
                                                    placeholder="Visible ID"
                                                    type="text"
                                                    value={userData.visibleId}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="7">
                                            <FormGroup>
                                                <label htmlFor="exampleInputEmail1">
                                                    Username (Email address)
                          </label>
                                                <Input
                                                    disabled
                                                    placeholder="Email"
                                                    type="email"
                                                    value={userData.username}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <AvGroup>
                                                <label>First Name</label>
                                                <AvInput
                                                    placeholder="Firstname"
                                                    type="text"
                                                    value={this.state.firstname}
                                                    onChange={this.onChange}
                                                    required
                                                    name="firstname"
                                                />
                                                <AvFeedback>First Name cannot be blank!</AvFeedback>
                                            </AvGroup>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <AvGroup>
                                                <label>Last Name</label>
                                                <AvInput
                                                    placeholder="Lastname"
                                                    type="text"
                                                    value={this.state.lastname}
                                                    onChange={this.onChange}
                                                    required
                                                    name="lastname"
                                                />
                                                <AvFeedback>Last Name cannot be blank!</AvFeedback>
                                            </AvGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>Phone</label>
                                                <Input
                                                    placeholder="Phone"
                                                    type="text"
                                                    onChange={this.onChange}
                                                    name="phone"
                                                    value={this.state.phone}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <FormGroup>
                                                <label>Country</label>
                                                <Input
                                                    placeholder="Country"
                                                    type="text"
                                                    onChange={this.onChange}
                                                    name="country"
                                                    value={this.state.country}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>About Me</label>
                                                <Input
                                                    type="textarea"
                                                    placeholder="About me..."
                                                    onChange={this.onChange}
                                                    name="aboutMe"
                                                    value={this.state.aboutMe}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                                style={{ backgroundColor: "#003554" }}
                                            >
                                                {this.state.isLoading ? "Loading..." : "Update Profile"}
                                            </Button>
                                        </div>
                                    </Row>
                                </AvForm>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div >
        )
    }
}

UserInfo.propTypes = {
    userData: PropTypes.object.isRequired,
    getUsersInfo: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    tripGroup: PropTypes.object.isRequired,
    getTripGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userData: state.userData,
    security: state.security,
    tripGroup: state.tripGroups
});

export default connect(
    mapStateToProps,
    { getUsersInfo, updateUser, getTripGroups }
)(UserInfo);