import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import Card from "../Components/Card";
import Form from "../Components/Form";
import Input from "../Components/Input";

export default function Login(props) {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [buttonState, setButtonState] = useState('disabled')

    useEffect(() => {
        if (enteredEmail.length > 0 && enteredPassword.length > 0) {
            setButtonDisabled(false)
            setButtonState('enabled')
        }
        if (enteredEmail.length == 0 || enteredPassword.length == 0) {
            setButtonDisabled(true)
            setButtonState('disabled')
        }

    }, [enteredEmail, enteredPassword])

    const setEmailHandler = (event) => {
        setEnteredEmail(event.target.value)
    }
    const setPasswordHandler = (event) => {
        setEnteredPassword(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(`Correo: ${enteredEmail}`);
        console.log(`Contraseña: ${enteredPassword}`);
    }

    return (
        <React.Fragment>
            <Card
                title='Isla del lago' subtitle='Water Manager'>
                <Form className="customForm" onSubmit={submitHandler}>
                    <div className="customForm--title"> Iniciar sesion </div>
                    <Input onChange={setEmailHandler} type='email' placeHolder='Escribe tu correo electronico' id='userEmail' required={true} />
                    <Input onChange={setPasswordHandler} type='password' placeHolder='Escribe tu contraseña' id='userPassword' required={true} />
                    <Button state={buttonState} type='submit' text='Iniciar Sesion' disabled={buttonDisabled} />
                </Form>
            </Card>
        </React.Fragment>
    )
}