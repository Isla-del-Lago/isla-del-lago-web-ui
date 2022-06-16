import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './Store/auth-context';
import './Styles/Layout.css';

export default function Layout(props) {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const onLogout = () => {
        authCtx.onLogout();
        navigate('/');
    };
    return (
        <React.Fragment>
            <nav
                id='navbar'
                className='navbar navbar-expand-lg navbar-dark bg-dark'
            >
                <div className='container-fluid'>
                    <Link to='/'>
                        <span className='navbar-brand'>Isla del lago</span>
                    </Link>
                </div>
                {!authCtx.userLoginState && (
                    <Link to='/login'>
                        <button className='customButton'>Iniciar sesión</button>
                    </Link>
                )}
                {!authCtx.userLoginState && (
                    <Link to='/register'>
                        <button className='customButton'>Registarse</button>
                    </Link>
                )}
                {authCtx.userLoginState && (
                    <button className='customButton' onClick={onLogout}>
                        Cerrar sesión
                    </button>
                )}
            </nav>
            {props.children}
        </React.Fragment>
    );
}
