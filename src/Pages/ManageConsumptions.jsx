import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import utils from '../Components/Utils.json';
import Button from '../Components/Button';
import Form from '../Components/Form';
import DateInput from '../Components/DateInput';
import Input from '../Components/Input';
import ApartmentConsumptionTable from '../Components/ApartmentConsumptionTable';
import './Styles/ManageConsumptions.css';
import Loader from '../Components/Loader';

export default function ManageConsumptions(props) {
    const { userLoginState } = props;
    if (!userLoginState) {
        document.location = '/';
    }
    const today = new Date();
    let maxDate;
    if (today.getMonth() < 9) {
        maxDate =
            today.getFullYear() +
            '-' +
            '0' +
            parseInt(today.getMonth() + 1) +
            '-';
        if (today.getDate() < 9) {
            maxDate += '0' + parseInt(today.getDate());
        } else {
            maxDate += parseInt(today.getDate());
        }
    } else {
        maxDate =
            today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-';
        if (today.getDate() < 9) {
            maxDate += '0' + parseInt(today.getDate());
        } else {
            maxDate += parseInt(today.getDate());
        }
    }

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonState, setButtonState] = useState('disabled');
    const [searched, setSearched] = useState(false);
    const [loaderVisibility, setLoaderVisibility] = useState('invisible');

    const [enteredStartDate, setEnteredStartDate] = useState('');
    const [enteredEndDate, setEnteredEndDate] = useState('');
    const [enteredApartmentId, setEnteredApartmentId] = useState('');
    const [currentBill, setCurrentBill] = useState({});
    const [currentConsumption, setCurrentConsumption] = useState({});
    const setStartDateHandler = (event) => {
        setEnteredStartDate(event.target.value);
    };
    const setEndDateHandler = (event) => {
        setEnteredEndDate(event.target.value);
    };
    const setApartmentHandler = (event) => {
        setEnteredApartmentId(event.target.value);
    };

    useEffect(() => {
        if (
            enteredStartDate.length > 0 &&
            enteredEndDate.length > 0 &&
            enteredApartmentId.length > 0
        ) {
            setButtonDisabled(false);
            setButtonState('enabled');
        }
        if (
            enteredStartDate.length === 0 ||
            enteredEndDate.length === 0 ||
            enteredApartmentId.length === 0
        ) {
            setButtonDisabled(true);
            setButtonState('disabled');
        }
    }, [enteredStartDate, enteredEndDate, enteredApartmentId]);

    const submitHandler = (event) => {
        setLoaderVisibility('visible');
        event.preventDefault();
        fetch(
            `${process.env.REACT_APP_BILL_URL}/api/v1/bill/billDate?startDate=${enteredStartDate}&endDate=${enteredEndDate}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': utils.headers['Content-Type'],
                    'X-Uuid': sessionStorage.getItem('X-uuid'),
                    Authorization: sessionStorage.getItem('Token'),
                },
            }
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.billId) {
                    setCurrentBill(response);
                    fetch(
                        `${process.env.REACT_APP_BILL_URL}/api/v1/bill/consumption/consumptionDetail/apartmentId/${enteredApartmentId}/billId/${response.billId}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': utils.headers['Content-Type'],
                                'X-Uuid': sessionStorage.getItem('X-uuid'),
                                Authorization: sessionStorage.getItem('Token'),
                            },
                        }
                    )
                        .then((response) => response.json())
                        .then((response) => {
                            setSearched(true);
                            setLoaderVisibility('invisible');
                            setCurrentConsumption(response);
                            if (response.error) {
                                setSearched(false);
                                Swal.fire({
                                    title: response.errorCode,
                                    text: response.error,
                                    icon: 'warning',
                                    confirmButtonText: 'Continuar',
                                });
                            }
                        })
                        .catch((error) => {
                            setSearched(false);
                            Swal.fire({
                                title: 'Error!' + error.State,
                                text: error.error,
                                icon: 'error',
                                confirmButtonText: 'Continuar',
                            });
                        });
                }
                if (response.error) {
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
                    title: 'Error!' + error.State,
                    text: error.error,
                    icon: 'error',
                    confirmButtonText: 'Continuar',
                })
            );
    };

    return (
        <React.Fragment>
            {userLoginState && (
                <Form className='customForm' onSubmit={submitHandler}>
                    <div className='customForm--title'>
                        Consultar una factura
                    </div>
                    <DateInput
                        onChange={setStartDateHandler}
                        autoFocus={true}
                        type='date'
                        id='startDate'
                        label='Inicio periodo de facturación'
                        required={true}
                        maxDate={maxDate}
                    />
                    <DateInput
                        onChange={setEndDateHandler}
                        type='date'
                        id='endDate'
                        label='Fin periodo de facturación'
                        required={true}
                        maxDate={maxDate}
                        minDate={enteredStartDate}
                    />
                    <Input
                        onChange={setApartmentHandler}
                        autoFocus={true}
                        type='text'
                        placeHolder='Apartamento'
                        id='apartmentId'
                        required={true}
                    />
                    <Button
                        state={buttonState}
                        type='submit'
                        text='Generar'
                        disabled={buttonDisabled}
                    />
                </Form>
            )}
            <Loader visible={loaderVisibility} />
            {searched && (
                <ApartmentConsumptionTable
                    residentialBasicCubicMeters={
                        currentConsumption.residentialBasicCubicMeters
                    }
                    residentialBasicSuperiorCubicMeters={
                        currentConsumption.residentialBasicSuperiorCubicMeters
                    }
                    residentialFixedAqueductFee={
                        currentBill.residentialFixedAqueduct
                    }
                    residentialBasicAqueductFee={
                        currentBill.residentialBasicAqueduct
                    }
                    residentialBasicSuperiorAqueductFee={
                        currentBill.residentialBasicSuperiorAqueduct
                    }
                    residentialFixedSewerageFee={
                        currentBill.residentialFixedSewerage
                    }
                    residentialBasicSewerageFee={
                        currentBill.residentialBasicSewerage
                    }
                    residentialBasicSuperiorSewerageFee={
                        currentBill.residentialBasicSuperiorSewerage
                    }
                    residentialFixedAqueduct={parseFloat(currentConsumption.residentialFixedAqueduct).toFixed(
                        2
                    )}
                    residentialBasicAqueduct={parseFloat(currentConsumption.residentialBasicAqueduct).toFixed(
                        2
                    )}
                    residentialBasicSuperiorAqueduct={parseFloat(currentConsumption.residentialBasicSuperiorAqueduct).toFixed(
                        2
                    )}
                    residentialFixedSewerage={parseFloat(currentConsumption.residentialFixedSewerage).toFixed(
                        2
                    )}
                    residentialBasicSewerage={parseFloat(currentConsumption.residentialBasicSewerage).toFixed(
                        2
                    )}
                    residentialBasicSuperiorSewerage={parseFloat(currentConsumption.residentialBasicSuperiorSewerage).toFixed(
                        2
                    )}
                    cleaning={parseFloat(currentConsumption.cleaning).toFixed(2)}
                    discounts={parseFloat(currentConsumption.discounts).toFixed(2)}
                    total={parseFloat(currentConsumption.total).toFixed(2)}
                />
            )}
        </React.Fragment>
    );
}
