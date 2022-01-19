import React, { useEffect, useState } from "react";
import Button from '../Components/Button';
import Card from "../Components/Card";
import Form from "../Components/Form";
import Input from '../Components/Input';

import './Styles/Resgister.css'


export default function Register(props) {

    const [enteredName, setEnteredName] = useState('')
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [buttonState, setButtonState] = useState('disabled')

    useEffect(() => {
        if (enteredName.length > 0 && enteredEmail.length > 0 && enteredPassword.length > 0) {
            setButtonDisabled(false)
            setButtonState('enabled')
        }
        if (enteredName.length == 0 || enteredEmail.length == 0 || enteredPassword.length == 0) {
            setButtonDisabled(true)
            setButtonState('disabled')
        }
    },
        [enteredName, enteredEmail, enteredPassword])

    const setNameHandler = (event) => {
        setEnteredName(event.target.value)
    }
    const setEmailHandler = (event) => {
        setEnteredEmail(event.target.value)
    }
    const setPasswordHandler = (event) => {
        setEnteredPassword(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(`Nombre: ${enteredName}`);
        console.log(`Correo: ${enteredEmail}`);
        console.log(`Contraseña: ${enteredPassword}`);
    }
    return (
        <React.Fragment>
            <Card
                title='Isla del lago' subtitle='Water Manager'>
                <Form className="customForm" onSubmit={submitHandler}>
                    <div className="customForm--title"> Registro </div>
                    <Input onChange={setNameHandler} type='text' placeHolder='Escribe tu nombre' id='userName' required={true} />
                    <Input onChange={setEmailHandler} type='email' placeHolder='Escribe tu correo electronico' id='userEmail' required={true} />
                    <Input onChange={setPasswordHandler} type='password' placeHolder='Escribe tu contraseña' id='userPassword' required={true} />
                    <Button state={buttonState} type='submit' text='Registrarme' disabled={buttonDisabled} />
                </Form>
            </Card >
        </React.Fragment >
    )
}