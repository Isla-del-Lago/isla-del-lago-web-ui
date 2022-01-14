import React from "react";
import './Styles/Card.css'

export default function Card(props) {
    const { title, subtitle } = props
    return (
        <React.Fragment>
            <div className="customCard">
                <div className="customCard__titleContainer">
                    <div className="customCard__titleContainer--title">{title}</div>
                    <div className="customCard__titleContainer--subtitle">{subtitle}</div>
                </div>
                {props.children}
            </div>
        </React.Fragment>
    )
}