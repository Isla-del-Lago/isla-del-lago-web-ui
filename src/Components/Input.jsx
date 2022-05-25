import React from 'react';
import './Styles/Input.css';

export default function Input(props) {
    const { label, type, placeHolder, id, required, onChange, autoFocus } =
        props;

    const onBlur = (event) => {
        event.target.blur();
    };
    return (
        <React.Fragment>
            <label className='inputLabel' htmlFor={id}>
                {label}
            </label>
            <input
                onChange={onChange}
                className='customInput'
                type={type}
                placeholder={placeHolder}
                id={id}
                required={required}
                autoFocus={autoFocus}
                step='.01'
                onWheel={onBlur}
            />
        </React.Fragment>
    );
}
