import React, {useEffect, useState} from "react";
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

function App() {
    const [searchInput, setSearchInput] = useState('');
    const [profile, setProfile] = useState(null);
    const {
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        isLoading,
        getAccessTokenSilently,
        getIdTokenClaims
    } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            userProfile(getAccessTokenSilently, getIdTokenClaims).then(profile => {
                setProfile(profile);
            });
        }
    }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims]);

    const onLogout = () => {
        logout({returnTo: window.location.origin});
    };

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    if (isLoading) {
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
                    {isAuthenticated && <Container>
                        <Row>
                            <Col lg={8}>
                                <FormControl
                                    onChange={handleSearchInput}
                                    value={searchInput}
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                />
                            </Col>
                            <Col>
                                <Button bsPrefix="btn-custom" variant="primary" type="submit">
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Container>}
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
            <AppContext.Provider value={{
                authenticatedUser: user, setAuthenticatedUser: () => {
                }
            }}>
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

    return await response.json();
};

export default App;