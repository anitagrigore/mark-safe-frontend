import React, {useCallback, useState} from "react";
import {List} from "immutable";
import {useAuth0} from "@auth0/auth0-react";
import {Button, FormControl} from "react-bootstrap";

import './styles.css';

export function ProfileSearch(props) {
    const [searchInput, setSearchInput] = useState('');
    const [isSearchLoading, setSearchLoading] = useState(false);
    const [searchProfiles, setSearchProfiles] = useState(List.of());

    const {
        isAuthenticated,
        getAccessTokenSilently,
        getIdTokenClaims
    } = useAuth0();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="SearchBox">
            <FormControl
                onChange={e => {
                    const newValue = e.target.value.trimStart();
                    setSearchInput(newValue);
                    setSearchLoading(true);

                    if (newValue.length > 0) {
                        doSearchProfiles(newValue, getAccessTokenSilently, getIdTokenClaims)
                            .then(profiles => {
                                setSearchProfiles(List(profiles))
                            })
                            .finally(() => {
                                setSearchLoading(false);
                            });
                    } else {
                        setSearchProfiles(searchProfiles.clear());
                        setSearchLoading(false);
                    }
                }}
                value={searchInput}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
            />
            <SearchResults
                profiles={searchProfiles}
                isLoading={isSearchLoading}
                onFollowSuccess={id => {
                    setSearchProfiles(searchProfiles.map(p => {
                        if (p._id === id) {
                            return { ...p, isFriend: true };
                        }

                        return p;
                    }));
                }}
            />
        </div>
    )
}

export function SearchResults({isLoading, profiles, onFollowSuccess}) {
    const shouldRender = isLoading || !profiles.isEmpty();
    if (!shouldRender) {
        return null;
    }
    return (
        <div className="SearchResultsContainer">
            {isLoading ? <p>Loading...</p> : <>
                {profiles.map(p => <SearchResult
                    key={p._id}
                    profile={p}
                    onFollowSuccess={() => onFollowSuccess(p._id)}
                />)}
            </>}
        </div>
    );
}

export function SearchResult({profile, onFollowSuccess}) {
    const {getAccessTokenSilently, getIdTokenClaims} = useAuth0();
    const onFollow = useCallback(() => {
        doFollow(profile._id, getAccessTokenSilently, getIdTokenClaims).then(() => onFollowSuccess());
    }, [profile, onFollowSuccess]);

    return (
        <div className="SearchResultProfile">
            <span className="ResultProfileName">{`${profile.firstName} ${profile.lastName}`}</span>
            {profile.isFriend ?
                <span style={{color: '#999'}}>Following</span> :
                <Button size="sm" variant="outline-info" onClick={onFollow}>Follow</Button>}
        </div>
    );
}

const doSearchProfiles = async (query, getAccessTokenSilently, getIdTokenClaims) => {
    const accessToken = await getAccessTokenSilently();
    const idTokenClaims = await getIdTokenClaims();
    const q = encodeURIComponent(query);
    const response = await fetch(`http://localhost:8080/profiles/search?q=${q}`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Id': idTokenClaims.__raw,
        },
    });


    const json = await response.json();
    return json.accounts;
};

const doFollow = async (profileId, getAccessTokenSilently, getIdTokenClaims) => {
    const accessToken = await getAccessTokenSilently();
    const idTokenClaims = await getIdTokenClaims();

    await fetch(`http://localhost:8080/profiles/self/friends`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Id': idTokenClaims.__raw,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId }),
    });
};
