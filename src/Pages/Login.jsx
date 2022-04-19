import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "../Components/Button";
import Card from "../Components/Card";
import Form from "../Components/Form";
import Input from "../Components/Input";
import utils from '../Components/Utils.json';

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
        if (enteredEmail.length === 0 || enteredPassword.length === 0) {
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
        fetch(utils.urlBase + '/user/login',
            {
                method: "POST",
                headers: {
                    'Content-Type': utils.headers["Content-Type"]
                },
                body:
                    JSON.stringify({
                        'email': enteredEmail,
                        'password': enteredPassword
                    })

            }
        )
            .then(response => response.json())
            .then(response => {
                if (response.uuid) {
                    sessionStorage.setItem(utils.keys["X-uuid"], response.uuid)
                    sessionStorage.setItem(utils.keys.Token, response.token)
                    sessionStorage.setItem(utils.keys.UserLoginStatus, true)
                    setTimeout(() => {
                        document.location = '/'
                    }, 2000);
                }
                if (response.error) {
                    Swal.fire({
                        title: response.errorCode,
                        text: response.error,
                        icon: 'warning',
                        confirmButtonText: 'Continuar'
                    })
                }
            })
            .catch(error =>
                Swal.fire({
                    title: 'Error!' + error.status,
                    text: error.error,
                    icon: 'error',
                    confirmButtonText: 'Continuar'
                }));
    }

    return (
        <React.Fragment>
            <Card
                title='Isla del lago' subtitle='Water Manager'>
                <Form className="customForm" onSubmit={submitHandler}>
                    <div className="customForm--title">Iniciar sesion</div>
                    <Input onChange={setEmailHandler} type='email' placeHolder='Escribe tu correo electronico' id='userEmail' required={true} />
                    <Input onChange={setPasswordHandler} type='password' placeHolder='Escribe tu contraseña' id='userPassword' required={true} />
                    <Button state={buttonState} type='submit' text='Iniciar Sesion' disabled={buttonDisabled} />
                </Form>
            </Card>
        </React.Fragment>
    )
}