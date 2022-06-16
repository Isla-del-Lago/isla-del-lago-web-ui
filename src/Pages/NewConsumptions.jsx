import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Form from '../Components/Form';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Loader from '../Components/Loader';

import utils from '../Components/Utils.json';
import AuthContext from '../Components/Store/auth-context';

const apartments = utils.apartments;
let consumptionsData = [];

export default function NewConsumptions() {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [loaderVisibility, setLoaderVisibility] = useState('invisible');


    if (!sessionStorage.billId) {
        document.location = '/';
    }

    const setConsumptionValue = (event) => {
        sessionStorage.setItem(event.target.id, event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoaderVisibility('visible');
        apartments.forEach((apartment) => {
            consumptionsData.push({
                apartmentId: apartment,
                value: parseFloat(sessionStorage.getItem(apartment)),
            });
        });
        fetch(
            `${process.env.REACT_APP_BILL_URL}/api/v1/bill/consumption/calculatePercentages`,
            {
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
            }
        )
            .then((response) => response.json())
            .then((response) => {
                consumptionsData = [];
                if (response.consumptionIds) {
                    setLoaderVisibility('invisible');
                    Swal.fire({
                        text: 'Consumos agregados con exito',
                        icon: 'success',
                        confirmButtonText: 'Continuar',
                    }).then(() => {
                        navigate('/');
                    });
                }
                if (response.error) {
                    setLoaderVisibility('invisible');
                    Swal.fire({
                        title: response.errorCode,
                        text: response.error,
                        icon: 'warning',
                        confirmButtonText: 'Continuar',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                    }).then(() => {
                        consumptionsData = [];
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
            {authCtx.userLoginState && (
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
                                required={true}
                            />
                        ))}
                        <Button
                            state='enabled'
                            type='submit'
                            text='Continuar'
                            disabled={false}
                        />
                    </Form>
                </div>
            )}
        </React.Fragment>
    );
}
