import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Home.css';
export default function Home(props) {
    const { userLoginState } = props;
    return (
        <div className='home'>
            {userLoginState && (
                <Link to='/create-bill'>
                    <button className='customButton'>Nueva factura</button>
                </Link>
            )}
        </div>
    );
}
