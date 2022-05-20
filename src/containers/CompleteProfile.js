import React, {useState} from "react";
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
import {useAuth0} from "@auth0/auth0-react";

export default function CompleteProfile(props) {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const {
        getAccessTokenSilently,
        getIdTokenClaims,
    } = useAuth0();

    const handleSubmit = e => {
        e.preventDefault();

        saveProfile(getAccessTokenSilently, getIdTokenClaims, { firstName, lastName })
            .then(props.onComplete);
    };

    return (
        <Container>
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
                    </Form.Group>
                    <Form.Group size="lg" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit">Save</Button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );
}

const saveProfile = async (getAccessTokenSilently, getIdTokenClaims, data) => {
    const accessToken = await getAccessTokenSilently();
    const idTokenClaims = await getIdTokenClaims();
    const response = await fetch('http://localhost:8080/profiles', {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Id': idTokenClaims.__raw,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });


    if (response.status === 409) {
        throw new Error('Profile already exists.');
    }

    const json = await response.json();
    return json.account;
};
