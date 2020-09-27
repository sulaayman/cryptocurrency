import React from 'react';
import logo from './logo.png';
import sbo from './sbo.png';
import Search from './Search'
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="Header">
        <Link to='/'>
            <img src={logo}/* {{'./images/logo'}}*/ alt="logo" className="Header-logo"/>
        </Link>
        <Search/>
        <img src={sbo} alt="tmdb-logo" className="rmdb-logo"/>
        </div>
    )
}

export default Header;