import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Form from '../Components/Form';
import Button from '../Components/Button';
import Loader from '../Components/Loader';

import utils from '../Components/Utils.json';
import AuthContext from '../Components/Store/auth-context';
import { CloseButton } from 'react-bootstrap';
import ConsumptionsForm from '../Components/ConsumptionsForm';

const apartments = utils.apartments;
let consumptionsData = [];

export default function NewConsumptions() {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [loaderVisibility, setLoaderVisibility] = useState(false);

    const [formConsumptionsStep, setFormConsumptionsStep] = useState(1);

    const formSectionCompleteHandler = () => {
        if (formConsumptionsStep < 5) {
            setFormConsumptionsStep(formConsumptionsStep + 1);
        }
    };
    const onBackButtonHandler = () => {
        if (formConsumptionsStep > 1) {
            setFormConsumptionsStep(formConsumptionsStep - 1);
        }
    };

    if (!sessionStorage.billId) {
        document.location = '/';
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (formConsumptionsStep === 5) {
            setLoaderVisibility(true);
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
                        setLoaderVisibility(false);
                        Swal.fire({
                            text: 'Consumos agregados con exito',
                            icon: 'success',
                            confirmButtonText: 'Continuar',
                        }).then(() => {
                            navigate('/');
                        });
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
                        }).then(() => {
                            consumptionsData = [];
                        });
                    }
                })
                .catch((error) => {
                    setLoaderVisibility(false);
                    Swal.fire({
                        title: 'Error!',
                        text: error.error,
                        icon: 'error',
                        confirmButtonText: 'Continuar',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                    });
                });
        } else {
            formSectionCompleteHandler();
        }
    };
    const closeFormHandler = () => {
        navigate('/home');
    };
    return (
        <React.Fragment>
            {loaderVisibility && <Loader />}
            {authCtx.userLoginState && (
                <Form className='customForm' onSubmit={submitHandler}>
                    <div className='formHeader'>
                        <CloseButton onClick={closeFormHandler} />
                        <div className='customForm--title'>Consumos</div>
                    </div>
                    <div className='formBody'>
                        {formConsumptionsStep === 1 && (
                            <ConsumptionsForm
                                firstApartment={apartments[0]}
                                secondApartment={apartments[1]}
                            />
                        )}
                        {formConsumptionsStep === 2 && (
                            <ConsumptionsForm
                                firstApartment={apartments[2]}
                                secondApartment={apartments[3]}
                            />
                        )}
                        {formConsumptionsStep === 3 && (
                            <ConsumptionsForm
                                firstApartment={apartments[4]}
                                secondApartment={apartments[5]}
                            />
                        )}
                        {formConsumptionsStep === 4 && (
                            <ConsumptionsForm
                                firstApartment={apartments[6]}
                                secondApartment={apartments[7]}
                            />
                        )}
                        {formConsumptionsStep === 5 && (
                            <ConsumptionsForm
                                firstApartment={apartments[8]}
                                secondApartment={apartments[9]}
                            />
                        )}
                    </div>
                    <div className='buttonsContainer'>
                        {formConsumptionsStep === 1 && (
                            <Button
                                type='reset'
                                text='Cancelar'
                                onClick={onBackButtonHandler}
                            />
                        )}
                        {formConsumptionsStep !== 1 && (
                            <Button
                                type='reset'
                                text='Regresar'
                                onClick={onBackButtonHandler}
                            />
                        )}
                        {formConsumptionsStep === 5 && (
                            <Button
                                state='enabled'
                                type='submit'
                                text='Guardar'
                                disabled={false}
                            />
                        )}
                        {formConsumptionsStep !== 5 && (
                            <Button
                                state='enabled'
                                type='submit'
                                text='Continuar'
                                disabled={false}
                            />
                        )}
                    </div>
                </Form>
            )}
        </React.Fragment>
    );
}
