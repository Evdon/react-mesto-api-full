import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    return ( 
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <p className="header__mail">
                {props.mail}
                <button onClick={props.onClick} className={props.buttonClass || 'header__button_disabled'}>{props.buttonText}</button>
                {props.link && <Link to={props.link} className="header__link">
                    {props.linkText}
                </Link>}
            </p>
        </header>
   );
}

export default Header;