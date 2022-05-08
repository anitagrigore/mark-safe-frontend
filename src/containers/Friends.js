import React from "react";
import "./Friends.css"
import "../App.css";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {useNavigate} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function Friends() {
    const navigate = useNavigate();

    return (
        <Container>
            <Row>
                <Col sm={3} className="SidebarContainer">
                    <div className="Sidebar">
                        <Navigation
                            activeItemId="/friends"
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
            </Row>
        </Container>
    );
}