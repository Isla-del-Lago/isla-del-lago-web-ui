import React from 'react';
import { Link } from 'react-router-dom';
export default function Home(props) {
    const { userLoginState } = props;
    return (
        <div className='home'>
            <h2>HOME</h2>
            <Link to='/login'>
                <button className='customButton'>Login</button>
            </Link>
            <Link to='/register'>
                <button className='customButton'>Register</button>
            </Link>

            {userLoginState && (
                <Link to='/newConsumption'>
                    <button className='customButton'>New consumption</button>
                </Link>
            )}
        </div>
    );
}
