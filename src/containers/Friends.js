import React, {useEffect, useState} from "react";
import "./Friends.css"
import "../App.css";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {useNavigate} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {useAuth0} from "@auth0/auth0-react";
import {camelCase, startCase} from "lodash/string";

export default function Friends() {
    const navigate = useNavigate();

    const {getAccessTokenSilently, getIdTokenClaims} = useAuth0();
    const [isLoading, setLoading] = useState(true);
    const [eventIds, setEventIds] = useState([]);

    useEffect(() => {
        fetchEventIds(getAccessTokenSilently, getIdTokenClaims)
            .then(eventIds => setEventIds(eventIds))
            .finally(() => setLoading(false));
    }, [getAccessTokenSilently, getIdTokenClaims]);

    return (
        <Container>
            <Row>
                <Col sm={3} className="SidebarContainer">
                    <div className="Sidebar">
                        <Navigation
                            activeItemId="/friends"
                            onSelect={({itemId}) => navigate(itemId)}
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
                </Col>
                <Col>
                    <h1>Friends who are safe</h1>
                    {isLoading ?
                        <p>Loading...</p> :
                        eventIds.map(id => <EventBox key={id} eventId={id}/>)
                    }
                </Col>
            </Row>
        </Container>
    );
}

function EventBox({eventId}) {
    const {getAccessTokenSilently, getIdTokenClaims} = useAuth0();
    const [isEventLoading, setEventLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [areFriendsLoading, setFriendsLoading] = useState(true);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetchEvent(eventId, getAccessTokenSilently, getIdTokenClaims)
            .then(event => setEvent(event))
            .finally(() => setEventLoading(false));
        fetchSafeFriends(eventId, getAccessTokenSilently, getIdTokenClaims)
            .then(profileIds => profileIds.map(id => fetchProfile(id, getAccessTokenSilently, getIdTokenClaims)))
            .then(promises => Promise.all(promises))
            .then((friends) => setFriends(friends))
            .finally(() => setFriendsLoading(false));
    }, [getAccessTokenSilently, getIdTokenClaims]);

    if (isEventLoading) {
        return null;
    }

    const rtf = new Intl.DateTimeFormat('en-GB');
    const createDate = Date.parse(event.createTimestamp);

    return (
        <div>
            <h4>{startCase(camelCase(event.kind))} on {rtf.format(createDate)}</h4>
            {areFriendsLoading ? <p>Loading safe friends...</p> : <div>
                {friends.length > 0 ? friends.map(profile => <p key={`${eventId}-${profile._id}`}>
                    {profile.firstName} {profile.lastName}
                </p>) : <p>Nobody yet.</p>}
            </div>}
        </div>
    );
}

const fetchEventIds = async (getAccessTokenSilently, getIdTokenClaims) => {
    const accessToken = await getAccessTokenSilently();
    const idTokenClaims = await getIdTokenClaims();
    const response = await fetch('http://localhost:8080/events', {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Id': idTokenClaims.__raw,
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    return json.eventIds;
};


const fetchEvent = async (eventId, getAccessTokenSilently, getIdTokenClaims) => {
    const accessToken = await getAccessTokenSilently();
    const idTokenClaims = await getIdTokenClaims();
    const response = await fetch(`http://localhost:8080/events/${eventId}`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Id': idTokenClaims.__raw,
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    return json.event;
};


const fetchSafeFriends = async (eventId, getAccessTokenSilently, getIdTokenClaims) => {
    const accessToken = await getAccessTokenSilently();
    const idTokenClaims = await getIdTokenClaims();
    const response = await fetch(`http://localhost:8080/events/${eventId}/markSafe`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Id': idTokenClaims.__raw,
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    return json.safeFriends;
};

const fetchProfile = async (profileId, getAccessTokenSilently, getIdTokenClaims) => {
    const accessToken = await getAccessTokenSilently();
    const idTokenClaims = await getIdTokenClaims();
    const response = await fetch(`http://localhost:8080/profiles/${profileId}`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Id': idTokenClaims.__raw,
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    return json.profile;
};


