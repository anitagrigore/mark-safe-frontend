import React, {useState} from "react";
import "./Report.css";
import "../App.css";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Report() {
    const navigate = useNavigate();
    const  [reportSuccessful, setReportSuccessful] = useState(false);

    const handleReport  = (event) => {
        event.preventDefault();
        setReportSuccessful(true);
    };

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
                    <div>
                        <Form>
                            <Form.Select size="lg" bsPrefix="custom-select" aria-label="Select the category of danger">
                                <option>Open this select menu</option>
                                <option value="BOMB">Bomb</option>
                                <option value="FIRE">Fire</option>
                                <option value="NUKE">Nuclear attack</option>
                                <option value="AIR_ATTACK">Air attack</option>
                                <option value="GUN_SHOTS">Gun shots</option>
                                <option value="OTHER">Other</option>
                            </Form.Select>

                            <Button bsPrefix="btn-custom" variant="primary" type="submit">
                                Report
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}