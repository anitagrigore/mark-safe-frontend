import React, {useEffect} from "react";
import "./Home.css";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [ isAuthenticated ]);

    return (
        <div className="Home">
            <div className="lander">
                <h1>MarkSafe</h1>
                <p className="text-muted">See if your family is safe. With us.</p>
            </div>
        </div>
    );
}