import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Profile.css"
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

export default function Friends() {
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <React.Fragment>
            <div className="Container">
                <div className="Sidebar">
                    <Navigation
                        activeItemId="/friends"
                        items={[
                            {
                                title: "Profile",
                                itemId: "/profile",
                            },
                            {
                                title: "Friends",
                                itemId: "/friends",
                            },
                            {
                                title: "Report Danger",
                                itemId: "/report",
                            }
                        ]}/>
                </div>
            </div>
        </React.Fragment>

    );
}