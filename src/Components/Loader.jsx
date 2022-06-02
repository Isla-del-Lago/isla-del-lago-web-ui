import React from 'react';
import './Styles/Loader.css';
export default function Loader(props) {
    const { visible } = props;
    return (
        <React.Fragment>
            <div className={`d-flex justify-content-center ${visible}`}>
                <div className='spinner-grow text-primary' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
                <div className='spinner-grow text-primary' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
                <div className='spinner-grow text-primary' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>
        </React.Fragment>
    );
}
