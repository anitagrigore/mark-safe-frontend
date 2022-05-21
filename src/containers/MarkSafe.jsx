import {useNavigate, useParams} from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";

export function MarkSafe(props) {
    const navigate = useNavigate();

    const { eventId } = useParams();
    const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

    const [ isLoading, setLoading ] = useState(true);

    useEffect(() => {
        doMarkSafe(eventId, getAccessTokenSilently, getIdTokenClaims)
            .then(() => navigate('/'))
            .finally(() => setLoading(false));
    }, [eventId, getAccessTokenSilently, getIdTokenClaims]);

    return (
        <Container>
            {isLoading ? <p>Marking you safe...</p> : null}
        </Container>
    );
}

const doMarkSafe = async (eventId, getAccessTokenSilently, getIdTokenClaims) => {
    const accessToken = await getAccessTokenSilently();
    const idTokenClaims = await getIdTokenClaims();

    await fetch(`http://localhost:8080/events/${eventId}/markSafe`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Id': idTokenClaims.__raw,
            'Content-Type': 'application/json',
        },
    });
};
