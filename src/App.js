import React, {useCallback, useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import {Form, FormControl, Button} from "react-bootstrap";
import "./App.css";
import logo from "./logo1.svg"
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import {AppContext} from "./lib/contextLib";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useAuth0} from "@auth0/auth0-react";
import CompleteProfile from "./containers/CompleteProfile";
import {useNavigate} from "react-router-dom";
import {throttle} from "lodash/function";
import {List} from "immutable";
import {ProfileSearch} from "./search/Search";

function App() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setProfileLoading] = useState(true);

    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        isLoading,
        getAccessTokenSilently,
        getIdTokenClaims
    } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            userProfile(getAccessTokenSilently, getIdTokenClaims).then(profile => {
                setProfile(profile);
                setProfileLoading(false);
            });
        } else {
            setProfileLoading(false);
        }
    }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims]);

    const onLogout = () => {
        logout({returnTo: window.location.origin});
    };

    if (isLoading || isProfileLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App container py-3">
            <Navbar variant="light" expand="md" className="navbar-color">
                <Navbar.Brand className="font-weight-bold text-muted">
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt=""
                    />{' '}
                    MarkSafe
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Form inline="true">
                    {isAuthenticated && <ProfileSearch/>}
                </Form>
                <Navbar.Collapse className="justify-content-end">
                    {isAuthenticated ? (
                        <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                    ) : (
                        <>
                            <Nav.Link href="/signup">Signup</Nav.Link>
                            <Nav.Link onClick={() => loginWithRedirect()}>Login</Nav.Link>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
            <AppContext.Provider value={{profile}}>
                {isAuthenticated && !profile ? <CompleteProfile onComplete={setProfile}/> : <Routes/>}
            </AppContext.Provider>
        </div>
    );
}

const userProfile = async (getAccessTokenSilently, getIdTokenClaims) => {
    const accessToken = await getAccessTokenSilently();
    const idTokenClaims = await getIdTokenClaims();
    const response = await fetch('http://localhost:8080/profiles/self', {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Id': idTokenClaims.__raw,
        },
    });

    if (response.status === 404) {
        return null;
    }

    const json = await response.json();
    return json.profile;
};


export default App;