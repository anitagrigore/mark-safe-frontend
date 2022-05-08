import React, {useContext, useState} from "react";
import Form from "react-bootstrap/Form";
import {useNavigate} from "react-router-dom";
import "./Signup.css";
import "../App.css";
import {useFormFields} from "../lib/hooksLib";
import Button from "react-bootstrap/Button";
import {AppContext} from "../lib/contextLib";

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { setAuthenticatedUser } = useContext(AppContext);
    const [ isLoading, setIsLoading ] = useState(false);

    const validateForm = () => (
        email.length > 0 &&
        password.length > 0 &&
        password === confirmPassword
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        // setIsLoading(true);
        setAuthenticatedUser({
            email,
        });
        navigate("/profile");
    }

    const onFieldChange = (fn) => (e) => fn(e.target.value);

    return (
        <div className="Signup">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" size="lg">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={onFieldChange(setEmail)}
                    />
                </Form.Group>
                <Form.Group controlId="password" size="lg">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={onFieldChange(setPassword)}
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword" size="lg">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={onFieldChange(setConfirmPassword)}
                    />
                </Form.Group>
                <Button bsPrefix="btn-custom" variant="primary" type="submit" disabled={!validateForm()}>
                    Create
                </Button>
            </Form>
        </div>
    );
}