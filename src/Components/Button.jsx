import React from 'react'
import './Styles/Button.css'
export default function Button(props) {
    const { type, text } = props
    return (
        <React.Fragment>
            <button className='customButton' type={type}> {text} </button>
        </React.Fragment>
    )
}