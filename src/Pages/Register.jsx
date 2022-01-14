import React from "react";
import Button from '../Components/Button';
import Card from "../Components/Card";
import Form from "../Components/Form";
import Input from '../Components/Input';

import './Styles/Resgister.css'

export default function Register(props) {
    return (
        <React.Fragment>
            <Card
                title='Isla del lago' subtitle='Water Manager'>
                <Form className="customForm" action="">
                    <div className="customForm--title"> Registro </div>
                    <Input type='text' placeHolder='Escribe tu nombre' id='userName' required='true' />
                    <Input type='email' placeHolder='Escribe tu correo electronico' id='userEmail' />
                    <Input type='password' placeHolder='Escribe tu contraseña' id='userPassword' />
                    <Button type='submit' text='Registrarme' />
                </Form>
            </Card >
        </React.Fragment >
    )
}