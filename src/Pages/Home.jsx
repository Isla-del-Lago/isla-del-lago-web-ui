import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Home.css';
export default function Home(props) {
    const { userLoginState } = props;
    return (
        <div className='home'>
            {!userLoginState && (
                <div className='titleContainer'>
                    <h1 className='title'>
                        Bienvenido, por favor inície sesíon
                    </h1>
                </div>
            )}
            {userLoginState && (
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
