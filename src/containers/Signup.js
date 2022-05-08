import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {useNavigate} from "react-router-dom";
import { useAppContext } from "../lib/contextLib";
import "./Signup.css";
import "../App.css";
import {useFormFields} from "../lib/hooksLib";
import Button from "react-bootstrap/Button";

export default function Signup() {
    const navigate = useNavigate();
    const [fields, onFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        setNewUser("test");

        setIsLoading(false);
        navigate("/");
    }

    return (
        <div className="Signup">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" size="lg">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={onFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="password" size="lg">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={fields.password}
                        onChange={onFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword" size="lg">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={onFieldChange}
                        value={fields.confirmPassword}
                    />
                </Form.Group>
                <Button bsPrefix="btn-custom" variant="primary" type="submit" disabled={!validateForm()}>
                    Create
                </Button>
            </Form>
        </div>
    );
}