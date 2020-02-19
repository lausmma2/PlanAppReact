import React, { Component } from 'react';
import { getUsersInfo } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../actions/userActions";
import { Link } from "react-router-dom";
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

class UserInfo extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "", //this.props.firstname,
            lastname: "",
            phone: "",
            country: "",
            aboutMe: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        //const { firstname, lastname, phone, country, aboutMe } = this.state;

        const updatedUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            country: this.state.country,
            aboutMe: this.state.aboutMe
        };
        this.props.updateUser(updatedUser, this.props.history);
        this.props.userData.userData.firstname = this.state.firstname;
        this.props.userData.userData.lastname = this.state.lastname;
        this.props.userData.userData.phone = this.state.phone;
        this.props.userData.userData.country = this.state.country;
        this.props.userData.userData.aboutMe = this.state.aboutMe;
        window.location.reload(true);
    }

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        } else {
            this.props.getUsersInfo();
            this.setState({ ...this.props.userData.userData });
        }
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
                                    <a href="#marek" onClick={e => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={require("../../images/cina.jpg")}
                                        />
                                        <h5 className="title">{userData.firstname} {userData.lastname}
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
                                                56 <br />
                                                <small>Places visited</small>
                                            </h5>
                                        </Col>
                                        <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                12 <br />
                                                <small>Kilometers</small>
                                            </h5>
                                        </Col>
                                        <Col className="mr-auto" lg="3">
                                            <h5>
                                                24,6$ <br />
                                                <small>Spent</small>
                                            </h5>
                                        </Col>
                                    </Row>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Groups I am in</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <ul className="list-unstyled team-members">
                                    <li>
                                        <Row>
                                            <Col md="2" xs="2">
                                                <div className="avatar">
                                                    <img
                                                        alt="..."
                                                        className="img-circle img-no-padding img-responsive"
                                                        src={require("../../images/cina.jpg")}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="7" xs="7">
                                                Šumava <br />
                                                <span className="text-muted">
                                                    <small>Offline</small>
                                                </span>
                                            </Col>
                                            <Col className="text-right" md="3" xs="3">
                                                <Button
                                                    className="btn-round btn-icon"
                                                    color="success"
                                                    outline
                                                    size="sm"
                                                >
                                                    <i className="fa fa-envelope" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li>
                                        <Row>
                                            <Col md="2" xs="2">
                                                <div className="avatar">
                                                    <img
                                                        alt="..."
                                                        className="img-circle img-no-padding img-responsive"
                                                        src={require("../../images/cina.jpg")}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="7" xs="7">
                                                Trip na Sněžku <br />
                                                <span className="text-success">
                                                    <small>Available</small>
                                                </span>
                                            </Col>
                                            <Col className="text-right" md="3" xs="3">
                                                <Button
                                                    className="btn-round btn-icon"
                                                    color="success"
                                                    outline
                                                    size="sm"
                                                >
                                                    <i className="fa fa-envelope" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li>
                                        <Row>
                                            <Col md="2" xs="2">
                                                <div className="avatar">
                                                    <img
                                                        alt="..."
                                                        className="img-circle img-no-padding img-responsive"
                                                        src={require("../../images/cina.jpg")}
                                                    />
                                                </div>
                                            </Col>
                                            <Col className="col-ms-7" xs="7">
                                                Vranov 2020 <br />
                                                <span className="text-danger">
                                                    <small>Busy</small>
                                                </span>
                                            </Col>
                                            <Col className="text-right" md="3" xs="3">
                                                <Button
                                                    className="btn-round btn-icon"
                                                    color="success"
                                                    outline
                                                    size="sm"
                                                >
                                                    <i className="fa fa-envelope" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </li>
                                </ul>
                                <Row>
                                    <div className="update ml-auto mr-auto">
                                        <Link to="add-trip-group"
                                            //onSubmit={this.handleSubmit}
                                            //onChange={(e)=> this.handleOnChange(e)}
                                            className="btn-round"
                                            color="primary"
                                            type="submit"
                                        >
                                            Create group
                                            </Link>
                                    </div>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="8">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Edit Profile</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={this.onSubmit}>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <FormGroup>
                                                <label>Visible ID (disabled)</label>
                                                <Input
                                                    disabled
                                                    placeholder="Company"
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
                                                    //defaultValue={this.state.userData.email}
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
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Input
                                                    //defaultValue={userData.firstname}
                                                    placeholder="Firstname"
                                                    type="text"
                                                    value={this.state.firstname}
                                                    onChange={this.onChange}
                                                    required
                                                    name="firstname"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Input
                                                    //defaultValue={this.state.userData.lastName}
                                                    placeholder="Lastname"
                                                    type="text"
                                                    value={this.state.lastname}
                                                    onChange={this.onChange}
                                                    required
                                                    name="lastname"
                                                //value={this.state.lastname}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>Phone</label>
                                                <Input
                                                    //defaultValue={this.state.userData.phone}
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
                                                    //defaultValue="Australia"
                                                    placeholder="Country"
                                                    type="text"
                                                    // defaultValue={userData.country}
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
                                                    //defaultValue={userData.aboutMe}
                                                    onChange={this.onChange}
                                                    name="aboutMe"
                                                    value={this.state.aboutMe}
                                                //defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                //onSubmit={this.handleSubmit}
                                                //onChange={(e)=> this.handleOnChange(e)}
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                            >
                                                Update Profile
                        </Button>
                                        </div>
                                    </Row>
                                </Form>
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
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    userData: state.userData,
    security: state.security
});

export default connect(
    mapStateToProps,
    { getUsersInfo, updateUser }
)(UserInfo);