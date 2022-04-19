import React from 'react'
import './Styles/Button.css'
export default function Button(props) {
    const { type, text, disabled, state, onClick} = props
    return (
        <React.Fragment>
            <button className={`customButton ${state}`} type={type} disabled={disabled} onClick={onClick} > {text} </button>
        </React.Fragment>
    )
}