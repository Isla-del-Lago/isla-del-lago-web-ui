import React from "react";
import './Styles/Input.css'

export default function Input(props) {
    const { type, placeHolder, id, required, onChange } = props
    return (
        <React.Fragment>
            <input onChange={onChange} className="customInput" type={type} placeholder={placeHolder} id={id} required={required} />
        </React.Fragment>
    )
}