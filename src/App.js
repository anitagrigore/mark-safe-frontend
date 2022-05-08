import React, {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import {Form, FormControl, Button} from "react-bootstrap";
import "./App.css";
import logo from "./logo1.svg"
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { AppContext } from "./lib/contextLib";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const onLogout = () => {
        setAuthUser(null);
        navigate("/login");
    };

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearch =(event) => {
        event.preventDefault();
        navigate("/results");
    };

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
          <Navbar.Toggle />
            <Form inline="true">
                {!!authUser && <Container>
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
                            <Button bsPrefix="btn-custom" variant="primary" type="submit" onClick={handleSearch}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Container>}
            </Form>
            <Navbar.Collapse className="justify-content-end">
                {!!authUser ? (
                    <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                ) : (
                    <>
                        <Nav.Link href="/signup">Signup</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
          <AppContext.Provider value={{ authenticatedUser: authUser, setAuthenticatedUser: setAuthUser }}>
              <Routes />
          </AppContext.Provider>
      </div>
  );
}

export default App;