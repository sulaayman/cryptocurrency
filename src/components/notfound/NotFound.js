import React from 'react';
import {Link} from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className='NotFound'>
            <h1 className="NotFound-title">Oops! Page not found</h1>
            
            <Link rel="stylesheet" className="NotFound-link" to='/'>Go to hompage</Link>
        </div>
    )
}

export default NotFound;