import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Profile.css"
import "../App.css"
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Profile() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <Container>
            <Row noGutters>
                <Col sm={3} className="SidebarContainer">
                    <div className="Sidebar">
                        <Navigation
                            activeItemId="/profile"
                            onSelect={({itemId}) => navigate(itemId)}
                            items={[
                                {
                                    title: "Profile",
                                    itemId: "/profile",
                                },
                                {
                                    title: "Friends",
                                    itemId: "/friends",
                                },
                                {
                                    title: "Report Danger",
                                    itemId: "/report",
                                }
                            ]}/>
                    </div>
                </Col>
                <Col>
                    <div className="Profile">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <Button bsPrefix="btn-custom" variant="primary" type="submit" disabled={!firstName}>
                                    Edit
                                </Button>
                                <Button bsPrefix="btn-custom" variant="primary" type="reset">
                                    Cancel
                                </Button>
                            </Form.Group>
                            <Form.Group size="lg" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <Button bsPrefix="btn-custom" variant="primary" type="submit" disabled={!lastName}>
                                    Edit
                                </Button>
                                <Button bsPrefix="btn-custom" variant="primary" type="reset">
                                    Cancel
                                </Button>
                            </Form.Group>
                            <Form.Group size="lg" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button bsPrefix="btn-custom" variant="primary" type="submit" disabled={!email}>
                                    Edit
                                </Button>
                                <Button bsPrefix="btn-custom" variant="primary" type="reset">
                                    Cancel
                                </Button>
                            </Form.Group>
                            <Form.Group size="lg" controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <Button bsPrefix="btn-custom" variant="primary" type="submit" disabled={!phoneNumber}>
                                    Edit
                                </Button>
                                <Button bsPrefix="btn-custom" variant="primary" type="reset">
                                    Cancel
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}