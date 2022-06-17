import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Styles/Loader.css';
export default function Loader() {
    return (
        <React.Fragment>
            <div className='container-fluid spinerBackground'>
                <div className={` d-flex justify-content-center`}>
                    <Spinner
                        className='spinner'
                        animation='border'
                        role='status'
                        variant='primary'
                    >
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </div>
            </div>
        </React.Fragment>
    );
}
