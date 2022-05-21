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
import {useAuth0} from "@auth0/auth0-react";

export default function Report() {
    const navigate = useNavigate();

    const [kind, setKind] = useState("");
    const [reportSuccessful, setReportSuccessful] = useState(false);
    const [reportInProgress, setReportInProgress] = useState(false);
    const {getAccessTokenSilently, getIdTokenClaims} = useAuth0();

    const onSubmit = e => {
        e.preventDefault();

        setReportInProgress(true);

        doReportEvent(getAccessTokenSilently, getIdTokenClaims, { kind })
            .then(eventId => {
                setReportSuccessful(true);
                console.log(eventId);
            })
            .finally(() => {
                setReportInProgress(false);
            });
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
                        <Form onSubmit={onSubmit}>
                            <Form.Select
                                size="lg"
                                bsPrefix="custom-select"
                                aria-label="Select the category of danger"
                                value={kind}
                                onChange={e => setKind(e.target.value)}
                                placeholder="Select kind of danger"
                            >
                                <option value="">Select kind of danger</option>
                                <option value="BOMB">Bomb</option>
                                <option value="FIRE">Fire</option>
                                <option value="NUKE">Nuclear attack</option>
                                <option value="AIR_ATTACK">Air attack</option>
                                <option value="GUN_SHOTS">Gun shots</option>
                                <option value="OTHER">Other</option>
                            </Form.Select>

                            <Button
                                bsPrefix="btn-custom"
                                variant="primary"
                                type="submit"
                                disabled={reportInProgress || reportSuccessful || kind.length === 0}
                            >
                                Report
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

const doReportEvent = async (getAccessTokenSilently, getIdTokenClaims, data) => {
    const accessToken = await getAccessTokenSilently();
    const idTokenClaims = await getIdTokenClaims();
    const response = await fetch('http://localhost:8080/events', {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Id': idTokenClaims.__raw,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const json = await response.json();
    return json.eventId;
};
