import React, {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import {Form, FormControl, Button} from "react-bootstrap";
import "./App.css";
import logo from "./logo1.svg"
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { AppContext } from "./lib/contextLib";
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
    const navigate = useNavigate();
    const [isAuthenticated, setAuthenticated] = useState(false);

    function handleLogout() {
        setAuthenticated(false);
        navigate("/login");
    }

    function handleSearchInput(event) {
        this.setState({
            searchText: event.target.value
        });
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
          <Navbar.Toggle />
            <Form inline="true">
                {isAuthenticated ? (
                <Container>
                    <Row>
                        <Col lg={8}>
                            <FormControl
                                onChange={handleSearchInput}
                                value=""
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
                </Container>
                ) : (<></>)}
            </Form>
            <Navbar.Collapse className="justify-content-end">
                {isAuthenticated ? (
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                ) : (
                    <>
                        <Nav.Link href="/signup">Signup</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
          <AppContext.Provider value={{ isAuthenticated, setAuthenticated }}>
              <Routes />
          </AppContext.Provider>
      </div>
  );
}

export default App;