import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import logo from "./logo1.svg"
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

function App() {
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
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link href="/signup">Signup</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
  );
}

export default App;