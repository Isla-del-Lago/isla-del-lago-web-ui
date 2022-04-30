import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../Components/Button';
import Card from '../Components/Card';
import Form from '../Components/Form';
import Input from '../Components/Input';
import './Styles/Resgister.css';

import utils from '../Components/Utils.json';

export default function Register(props) {
    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredApartment, setEnteredApartment] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonState, setButtonState] = useState('disabled');

    useEffect(() => {
        if (
            enteredName.length > 0 &&
            enteredEmail.length > 0 &&
            enteredApartment.length > 0 &&
            enteredPassword.length > 0
        ) {
            setButtonDisabled(false);
            setButtonState('enabled');
        }
        if (
            enteredName.length === 0 ||
            enteredEmail.length === 0 ||
            enteredApartment.length === 0 ||
            enteredPassword.length === 0
        ) {
            setButtonDisabled(true);
            setButtonState('disabled');
        }
    }, [enteredName, enteredEmail, enteredApartment, enteredPassword]);

    const setNameHandler = (event) => {
        setEnteredName(event.target.value);
    };
    const setEmailHandler = (event) => {
        setEnteredEmail(event.target.value);
    };
    const setApartmentHandler = (event) => {
        setEnteredApartment(event.target.value);
    };
    const setPasswordHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        fetch(utils.urlUserBase + '/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': utils.headers['Content-Type'],
            },
            body: JSON.stringify({
                fullName: enteredName,
                email: enteredEmail,
                password: enteredPassword,
                apartmentId: enteredApartment
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.message === 'User created') {
                    Swal.fire({
                        title: response.message,
                        text: 'Te has registrado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Continuar',
                    }).then((value) => {
                        document.location = '/login';
                    });
                }
                if (response.message !== 'User created') {
                    Swal.fire({
                        title: response.errorCode,
                        text: response.error,
                        icon: 'warning',
                        confirmButtonText: 'Continuar',
                    });
                }
            })
            .catch((error) =>
                Swal.fire({
                    title: 'Error!' + error.status,
                    text: error.error,
                    icon: 'error',
                    confirmButtonText: 'Continuar',
                })
            );
    };

    return (
        <React.Fragment>
            <Card title='Isla del lago' subtitle='Water Manager'>
                <Form className='customForm' onSubmit={submitHandler}>
                    <div className='customForm--title'> Registro </div>
                    <Input
                        onChange={setNameHandler}
                        autoFocus={true}
                        type='text'
                        placeHolder='Escribe tu nombre'
                        id='userName'
                        required={true}
                    />
                    <Input
                        onChange={setEmailHandler}
                        type='email'
                        placeHolder='Escribe tu correo electronico'
                        id='userEmail'
                        required={true}
                    />
                    <Input
                        onChange={setApartmentHandler}
                        type='text'
                        placeHolder='¿Cual es tu apartamento?'
                        id='userApartment'
                        required={true}
                    />
                    <Input
                        onChange={setPasswordHandler}
                        type='password'
                        placeHolder='Escribe tu contraseña'
                        id='userPassword'
                        required={true}
                    />
                    <Button
                        state={buttonState}
                        type='submit'
                        text='Registrarme'
                        disabled={buttonDisabled}
                    />
                </Form>
            </Card>
        </React.Fragment>
    );
}
