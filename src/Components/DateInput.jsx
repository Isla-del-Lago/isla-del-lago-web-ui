import React from 'react';
import './Styles/Input.css';

export default function DateInput(props) {
    const { type, label, id, required, onChange, maxDate, autoFocus } = props;

    return (
        <React.Fragment>
            <label className='dateLabel' htmlFor={id}>
                {label}
            </label>
            <input
                onChange={onChange}
                className='customInput'
                type={type}
                id={id}
                required={required}
                max={maxDate}
                autoFocus={autoFocus}
            />
        </React.Fragment>
    );
}
