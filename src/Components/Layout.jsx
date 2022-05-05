import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Layout.css';

export default function Layout(props) {
    const { userLoginState } = props;
    const logoutHandler = () => {
        sessionStorage.clear();
        props.onLogoutHandler();
    };
    return (
        <React.Fragment>
            <nav
                id='navbar'
                className='navbar navbar-expand-lg navbar-dark bg-dark'
            >
                <div className='container-fluid'>
                    <a className='navbar-brand' href='/'>
                        Isla del lago
                    </a>
                </div>
                { !userLoginState && (
                    <Link to='/login'>
                        <button className='customButton'>Iniciar sesión</button>
                    </Link>
                )}
                {!userLoginState && (
                    <Link to='/register'>
                        <button className='customButton'>Registarse</button>
                    </Link>
                )}
                {userLoginState && (
                <button className='customButton' onClick={logoutHandler}>
                    Cerrar sesión
                </button>
            )}
            </nav>
            {props.children}
        </React.Fragment>
    );
}
