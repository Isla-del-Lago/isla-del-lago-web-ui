import React from "react";
import './Styles/Input.css'

export default function Input(props) {
    const { type, placeHolder, id } = props
    return (
        <React.Fragment>
            <input className="customInput" type={type} placeholder={placeHolder} id={id} required />
        </React.Fragment>
    )
}