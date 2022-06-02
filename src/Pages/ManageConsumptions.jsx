import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import utils from '../Components/Utils.json';
import Button from '../Components/Button';
import Form from '../Components/Form';
import DateInput from '../Components/DateInput';
import Input from '../Components/Input';
import ApartmentConsumptionTable from '../Components/ApartmentConsumptionTable';
import './Styles/ManageConsumptions.css';

export default function ManageConsumptions(props) {
    const { userLoginState, urlUserBase, urlBillBase } = props;

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
        event.preventDefault();
        fetch(
            `${urlBillBase}/api/v1/bill/billDate?startDate=${enteredStartDate}&endDate=${enteredEndDate}`,
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
                console.log(response);
                if (response.billId) {
                    setCurrentBill(response);
                    fetch(
                        `${urlBillBase}/api/v1/bill/consumption/consumptionDetail/apartmentId/${enteredApartmentId}/billId/${response.billId}`,
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
                            setCurrentConsumption(response);
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
            {!userLoginState && (
                <div className='home'>
                    <Link to='/login'>
                        <button className='customButton'>Iniciar sesión</button>
                    </Link>
                </div>
            )}
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
            {!searched && (
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
                    residentialFixedAqueduct={
                        currentConsumption.residentialFixedAqueduct
                    }
                    residentialBasicAqueduct={
                        currentConsumption.residentialBasicAqueduct
                    }
                    residentialBasicSuperiorAqueduct={
                        currentConsumption.residentialBasicSuperiorAqueduct
                    }
                    residentialFixedSewerage={
                        currentConsumption.residentialFixedSewerage
                    }
                    residentialBasicSewerage={
                        currentConsumption.residentialBasicSewerage
                    }
                    residentialBasicSuperiorSewerage={
                        currentConsumption.residentialBasicSuperiorSewerage
                    }
                    cleaning={currentConsumption.cleaning}
                    discounts={currentConsumption.discounts}
                    total={currentConsumption.total}
                />
            )}
        </React.Fragment>
    );
}
