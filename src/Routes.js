import React from "react";
import {Route, Routes as RouterRoutes} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import Friends from "./containers/Friends";
import Report from "./containers/Report";
import Results from "./containers/Results";
import {MarkSafe} from "./containers/MarkSafe";

export default function Routes() {
    return (
        <RouterRoutes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/friends" element={<Friends/>}/>
            <Route exact path="/report" element={<Report/>}/>
            <Route exact path="/results" element={<Results/>}/>
            <Route exact path="/events/:eventId/markSafe" element={<MarkSafe/>}/>
            <Route element={<NotFound/>}/>
        </RouterRoutes>
    );
}