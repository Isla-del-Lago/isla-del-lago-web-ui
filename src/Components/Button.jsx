import React from 'react'
import './Styles/Button.css'
export default function Button(props) {
    const { type, text, disabled, state } = props
    return (
        <React.Fragment>
            <button className={`customButton ${state}`} type={type} disabled={disabled} > {text} </button>
        </React.Fragment>
    )
}