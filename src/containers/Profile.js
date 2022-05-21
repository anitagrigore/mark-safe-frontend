import React, {useContext} from "react";
import Form from "react-bootstrap/Form";
import "./Profile.css"
import "../App.css"
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {AppContext} from "../lib/contextLib";

export default function Profile() {
    const navigate = useNavigate();
    const { profile } = useContext(AppContext);

    if (!profile) {
        throw new Error('Profile should not be undefined at this point.');
    }

    const { firstName, lastName, email } = profile;

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <Container>
            <Row>
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
                                    readOnly
                                    type="text"
                                    value={firstName}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={lastName}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    readOnly
                                    value={email}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}