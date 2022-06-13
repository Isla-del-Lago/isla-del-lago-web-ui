import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Components/Store/auth-context';
import './Styles/Home.css';
export default function Home(props) {
    const authCtx = useContext(AuthContext)
    return (
        <div className='home'>
            {!authCtx.userLoginState && (
                <div className='titleContainer'>
                    <h1 className='title'>
                        Bienvenido, por favor inície sesíon
                    </h1>
                </div>
            )}
            {authCtx.userLoginState && (
                <div className='buttonsContainer'>
                    <Link to='/create-bill'>
                        <button className='customButton'>Nueva factura</button>
                    </Link>
                    <Link to='/manage-consumptions'>
                        <button className='customButton'>
                            Gestionar facturas
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
