import React, {useContext, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import "../App.css";
import {AppContext, useAppContext} from "../lib/contextLib";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthenticatedUser } = useContext(AppContext);
    const navigate = useNavigate();

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setAuthenticatedUser({
            email,
        });
        navigate("/profile");
    };

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button bsPrefix="btn-custom" variant="primary" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}