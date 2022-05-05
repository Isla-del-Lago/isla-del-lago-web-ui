import React from 'react';
import './Styles/Input.css';

export default function DateInput(props) {
    const { type, label, id, required, onChange, maxDate, minDate, autoFocus } = props;

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
                min={minDate}
                autoFocus={autoFocus}
            />
        </React.Fragment>
    );
}
