import React from "react";
import {Button, Form} from "react-bootstrap";
import "./Report.css"
import "../App.css"
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Report() {
    const navigate = useNavigate();

    return (
        <Container>
            <Row>
                <Col sm={3} className="SidebarContainer">
                    <div className="Sidebar">
                        <Navigation
                            activeItemId="/report"
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
                    <div >
                        <Form>
                            <Form.Select size="lg" bsPrefix="custom-select" aria-label="Select the category of danger">
                                <option>Open this select menu</option>
                                <option value="1">Bomb</option>
                                <option value="2">Fire</option>
                                <option value="3">Nuclear attack</option>
                                <option value="3">Air attack</option>
                                <option value="3">Gun shots</option>
                                <option value="3">Other</option>
                            </Form.Select>
                        </Form>
                        <Button bsPrefix="btn-custom" variant="primary" type="submit">
                            Report
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}