import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './Styles/NewConsumptions.css';
import Form from '../Components/Form';
import Input from '../Components/Input';
import utils from '../Components/Utils.json';
import Button from '../Components/Button';
const apartments = utils.apartments;
let consumptionsData = [];
export default function NewConsumptions(props) {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonState, setButtonState] = useState('enabled');

    const { userLoginState } = props;

    const setConsumptionValue = (event) => {
        sessionStorage.setItem(event.target.id, event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        apartments.forEach((apartment) => {
            consumptionsData.push({
                apartmentId: apartment,
                value: parseFloat(sessionStorage.getItem(apartment)),
            });
        });
        fetch(utils.urlBillBase + '/bill/consumption/calculatePercentages', {
            method: 'POST',
            headers: {
                'Content-Type': utils.headers['Content-Type'],
                'X-Uuid': sessionStorage.getItem('X-uuid'),
                Authorization: sessionStorage.getItem('Token'),
            },
            body: JSON.stringify({
                billId: sessionStorage.billId,
                consumptions: consumptionsData,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                consumptionsData = [];
                if (response.consumptionIds) {
                    Swal.fire({
                        text: 'Consumos agregados con exito',
                        icon: 'success',
                        confirmButtonText: 'Continuar',
                    }).then(() => {
                        document.location = '/';
                    });
                }
                if (response.error) {
                    Swal.fire({
                        title: response.errorCode,
                        text: response.error,
                        icon: 'warning',
                        confirmButtonText: 'Continuar',
                    }).then(() => {
                        consumptionsData = [];
                    });
                }
            })
            .catch((error) =>
                Swal.fire({
                    title: 'Error!' + error.State,
                    text: error.error,
                    icon: 'error',
                    confirmButtonText: 'Continuar',
                }).then(() => {
                    consumptionsData = [];
                })
            );
    };
    return (
        <React.Fragment>
            {!userLoginState && (
                <div className='home'>
                    <Link to='/login'>
                        <button className='customButton'>Iniciar sesión</button>
                    </Link>
                </div>
            )}
            {userLoginState && (
                <div className='formsContainer'>
                    <Form className='customForm' onSubmit={submitHandler}>
                        <div className='customForm--title'>
                            Ingrese sus consumos
                        </div>
                        {apartments.map((apartment) => (
                            <Input
                                label={apartment}
                                id={apartment}
                                key={apartment}
                                onChange={setConsumptionValue}
                                type='number'
                                // placeHolder={apartment}
                                required={true}
                            />
                        ))}
                        <Button
                            state={buttonState}
                            type='submit'
                            text='Continuar'
                            disabled={buttonDisabled}
                        />
                    </Form>
                </div>
            )}
        </React.Fragment>
    );
}
