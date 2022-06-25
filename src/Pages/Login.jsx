import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import image1 from '../Assets/image 1.png';

import Button from '../Components/Button';
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
                    navigate('/home');
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
                    title: 'Error!' ,
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
                <Form className='customForm' onSubmit={submitHandler}>
                    <div className='welcome--title'>Bienvenido</div>
                    <div className='customForm--subtitle'>
                        Por favor ingresa para utilizar la aplicación
                    </div>
                    <img className='formImage' src={image1} alt='' />
                    <Input
                        onChange={setEmailHandler}
                        autoFocus={true}
                        type='email'
                        placeHolder='Correo electrónico'
                        id='userEmail'
                        required={true}
                    />
                    <Input
                        onChange={setPasswordHandler}
                        type='password'
                        placeHolder='Contraseña'
                        id='userPassword'
                        required={true}
                    />
                    <div className='hyperlinkContainer'>
                        <Link to='/'>
                            <span className='hyperlink'>
                                ¿Olvidaste tu contraseña?
                            </span>
                        </Link>
                    </div>
                    <Button
                        state={buttonState}
                        type='submit'
                        text='Ingresar'
                        disabled={buttonDisabled}
                    />
                </Form>
            )}
        </React.Fragment>
    );
}
