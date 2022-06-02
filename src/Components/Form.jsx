import React from 'react';
import './Styles/Form.css';

export default function Form(props) {
    const { onSubmit } = props;
    return (
        <React.Fragment>
            <div className='formsContainer'>
                <form className='customForm' onSubmit={onSubmit}>
                    {props.children}
                </form>
            </div>
        </React.Fragment>
    );
}
