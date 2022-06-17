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

export default function Login(props) {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [loaderVisibility, setLoaderVisibility] = useState(false);

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonState, setButtonState] = useState('disabled');

    useEffect(() => {
        if (enteredEmail.length > 0 && enteredPassword.length > 0) {
            setButtonDisabled(false);
            setButtonState('enabled');
        }
        if (enteredEmail.length === 0 || enteredPassword.length === 0) {
            setButtonDisabled(true);
            setButtonState('disabled');
        }
    }, [enteredEmail, enteredPassword]);

    const setEmailHandler = (event) => {
        setEnteredEmail(event.target.value);
    };
    const setPasswordHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoaderVisibility(true);
        fetch(`${process.env.REACT_APP_USER_URL}/api/v1/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': utils.headers['Content-Type'],
            },
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.uuid) {
                    setLoaderVisibility(false);
                    sessionStorage.clear();
                    sessionStorage.setItem(utils.keys['X-uuid'], response.uuid);
                    sessionStorage.setItem(
                        utils.keys.Token,
                        'Bearer ' + response.token
                    );
                    props.onLogin();
                    navigate('/');
                }
                if (response.error) {
                    setLoaderVisibility(false);
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
                setLoaderVisibility(false);
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
            {loaderVisibility && <Loader />}
            {!authCtx.userLoginState && (
                <Card title='Isla del lago' subtitle='Water Manager'>
                    <Form className='customForm' onSubmit={submitHandler}>
                        <div className='customForm--title'>Iniciar sesion</div>
                        <Input
                            onChange={setEmailHandler}
                            autoFocus={true}
                            type='email'
                            placeHolder='Escriba su correo electrónico'
                            id='userEmail'
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
                            text='Iniciar Sesion'
                            disabled={buttonDisabled}
                        />
                    </Form>
                </Card>
            )}
        </React.Fragment>
    );
}
