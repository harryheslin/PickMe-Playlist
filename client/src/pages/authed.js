import { React, useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
let qs = require('qs');

export default function Authed(props) {
    sessionStorage.removeItem('PickMePlaylist');
    let token = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    sessionStorage.setItem('PickMePlaylist', token.token);

    return (
        <Redirect to="/searchpage" />
    )   
}