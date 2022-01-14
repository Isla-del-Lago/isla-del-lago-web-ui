import React from "react";
import './Styles/Form.css'

export default function Form(props){
    return(
    <React.Fragment>
        <form className="customForm" action="">
            {props.children}
        </form>
    </React.Fragment>
    )
}