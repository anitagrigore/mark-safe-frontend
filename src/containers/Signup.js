import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";
import "./Signup.css";
import {useFormFields} from "../lib/hooksLib";
import Button from "react-bootstrap/Button";

export default function Signup() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const history = useHistory();
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
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="password" size="lg">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword" size="lg">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={handleFieldChange}
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