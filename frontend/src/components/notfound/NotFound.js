import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../navbar/navbar'

const NotFound = () => (
    <div>
        <NavBar />
        <h1>Oops! Something went wrong...</h1>
        <Link to="/">
            Go Home
        </Link>
    </div>
);

export default NotFound;