import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Button from '../Components/Button';
import Card from '../Components/Card';
import Form from '../Components/Form';
import Input from '../Components/Input';
import Loader from '../Components/Loader';

import utils from '../Components/Utils.json';
import AuthContext from '../Components/Store/auth-context';

export default function Register(props) {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [loaderVisibility, setLoaderVisibility] = useState('invisible');

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
        setLoaderVisibility('visible');
        fetch(`${process.env.REACT_APP_USER_URL}/api/v1/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': utils.headers['Content-Type'],
            },
            body: JSON.stringify({
                fullName: enteredName,
                email: enteredEmail,
                password: enteredPassword,
                apartmentId: enteredApartment,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.message === 'User created') {
                    setLoaderVisibility('invisible');
                    Swal.fire({
                        title: response.message,
                        text: 'Te has registrado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Continuar',
                    }).then(() => {
                        navigate('/login');
                    });
                }
                if (response.message !== 'User created') {
                    setLoaderVisibility('invisible');
                    Swal.fire({
                        title: response.errorCode,
                        text: response.error,
                        icon: 'warning',
                        confirmButtonText: 'Continuar',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                    });
                }
            })
            .catch((error) => {
                setLoaderVisibility('invisible');
                Swal.fire({
                    title: 'Error!' + error.State,
                    text: error.error,
                    icon: 'error',
                    confirmButtonText: 'Continuar',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                });
            });
    };

    return (
        <React.Fragment>
            <Loader visible={loaderVisibility} />
            {!authCtx.userLoginState && (
                <Card title='Isla del lago' subtitle='Water Manager'>
                    <Form className='customForm' onSubmit={submitHandler}>
                        <div className='customForm--title'> Registro </div>
                        <Input
                            onChange={setNameHandler}
                            autoFocus={true}
                            type='text'
                            placeHolder='Escriba su nombre'
                            id='userName'
                            required={true}
                        />
                        <Input
                            onChange={setEmailHandler}
                            type='email'
                            placeHolder='Escriba su correo electronico'
                            id='userEmail'
                            required={true}
                        />
                        <Input
                            onChange={setApartmentHandler}
                            type='text'
                            placeHolder='¿Cual es su apartamento?'
                            id='userApartment'
                            required={true}
                        />
                        <Input
                            onChange={setPasswordHandler}
                            type='password'
                            placeHolder='Escriba su contraseña'
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
            )}
        </React.Fragment>
    );
}
