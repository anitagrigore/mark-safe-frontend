import React, {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import logo from "./logo1.svg"
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { AppContext } from "./lib/contextLib";

function App() {
    const [isAuthenticated,setAuthenticated] = useState(false);

    function handleLogout() {
        setAuthenticated(false);
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