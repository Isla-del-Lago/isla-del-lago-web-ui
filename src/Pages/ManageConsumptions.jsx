import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';

import Button from '../Components/Button';
import Form from '../Components/Form';
import DateInput from '../Components/DateInput';
import Input from '../Components/Input';
import ApartmentConsumptionTable from '../Components/ApartmentConsumptionTable';
import Loader from '../Components/Loader';

import utils from '../Components/Utils.json';
import AuthContext from '../Components/Store/auth-context';
import Charts from '../Components/Charts';

import './Styles/ManageConsumptions.css';

let dates = [];
let costs = [];
let consumptions = [];
let currentApartment = '';
export default function ManageConsumptions() {
    const authCtx = useContext(AuthContext);
    const [loaderVisibility, setLoaderVisibility] = useState(false);
    const [searched, setSearched] = useState(false);

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

    const [enteredStartDate, setEnteredStartDate] = useState('');
    const [enteredEndDate, setEnteredEndDate] = useState('');
    const [enteredApartmentId, setEnteredApartmentId] = useState('');

    const [currentBill, setCurrentBill] = useState({});
    const [currentConsumption, setCurrentConsumption] = useState({});

    const [billDates, setBillDates] = useState([]);
    const [billConsumptions, setBillConsumptions] = useState([]);
    const [billCosts, setBillCosts] = useState([]);

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
        dates = [];
        consumptions = [];
        costs = [];
        if (currentApartment !== enteredApartmentId) {
            setSearched(false);
            setLoaderVisibility(true);
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
                .then((data) => {
                    if (data.billId) {
                        setCurrentBill(data);
                        currentApartment = enteredApartmentId;
                        fetch(
                            `${process.env.REACT_APP_BILL_URL}/api/v1/bill/consumption/consumptionDetail/apartmentId/${enteredApartmentId}/billId/${data.billId}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type':
                                        utils.headers['Content-Type'],
                                    'X-Uuid': sessionStorage.getItem('X-uuid'),
                                    Authorization:
                                        sessionStorage.getItem('Token'),
                                },
                            }
                        )
                            .then((response) => response.json())
                            .then((data) => {
                                setSearched(true);
                                setCurrentConsumption(data);
                                setLoaderVisibility(false);
                                if (data.error) {
                                    setSearched(false);
                                    setLoaderVisibility(false);
                                    Swal.fire({
                                        title: data.errorCode,
                                        text: data.error,
                                        icon: 'warning',
                                        confirmButtonText: 'Continuar',
                                    });
                                }
                            })
                            .catch((error) => {
                                setSearched(false);
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
                        fetch(
                            `${process.env.REACT_APP_BILL_URL}/api/v1/bill/consumption/consumptionDetail/apartmentId/${enteredApartmentId}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type':
                                        utils.headers['Content-Type'],
                                    'X-Uuid': sessionStorage.getItem('X-uuid'),
                                    Authorization:
                                        sessionStorage.getItem('Token'),
                                },
                            }
                        )
                            .then((response) => response.json())
                            .then((data) => {
                                if (data) {
                                    Object.entries(data)
                                        .sort()
                                        .forEach((element) => {
                                            dates.push(element[0]);
                                            consumptions.push(
                                                element[1]
                                                    .residentialBasicCubicMeters +
                                                    element[1]
                                                        .residentialBasicSuperiorCubicMeters
                                            );
                                            costs.push(element[1].total);
                                        });
                                    setBillDates(dates);
                                    setBillConsumptions(consumptions);
                                    setBillCosts(costs);
                                }
                                setLoaderVisibility(false);
                                if (data.error) {
                                    setSearched(false);
                                    setLoaderVisibility(false);
                                    Swal.fire({
                                        title: data.errorCode,
                                        text: data.error,
                                        icon: 'warning',
                                        confirmButtonText: 'Continuar',
                                    });
                                }
                            })
                            .catch((error) => {
                                setSearched(false);
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
                    }
                    if (data.error) {
                        setSearched(false);
                        setLoaderVisibility(false);
                        Swal.fire({
                            title: data.errorCode,
                            text: data.error,
                            icon: 'warning',
                            confirmButtonText: 'Continuar',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                        });
                    }
                })
                .catch((error) => {
                    setSearched(false);
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
        }
    };

    return (
        <React.Fragment>
            {loaderVisibility && <Loader />}
            {authCtx.userLoginState && (
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
            {searched && (
                <div className=''>
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
                        residentialFixedAqueduct={parseFloat(
                            currentConsumption.residentialFixedAqueduct
                        ).toFixed(2)}
                        residentialBasicAqueduct={parseFloat(
                            currentConsumption.residentialBasicAqueduct
                        ).toFixed(2)}
                        residentialBasicSuperiorAqueduct={parseFloat(
                            currentConsumption.residentialBasicSuperiorAqueduct
                        ).toFixed(2)}
                        residentialFixedSewerage={parseFloat(
                            currentConsumption.residentialFixedSewerage
                        ).toFixed(2)}
                        residentialBasicSewerage={parseFloat(
                            currentConsumption.residentialBasicSewerage
                        ).toFixed(2)}
                        residentialBasicSuperiorSewerage={parseFloat(
                            currentConsumption.residentialBasicSuperiorSewerage
                        ).toFixed(2)}
                        cleaning={parseFloat(
                            currentConsumption.cleaning
                        ).toFixed(2)}
                        discounts={parseFloat(
                            currentConsumption.discounts
                        ).toFixed(2)}
                        total={parseFloat(currentConsumption.total).toFixed(2)}
                        apartment={currentApartment}
                    />
                    <Charts
                        dates={billDates}
                        costs={billCosts}
                        consumptions={billConsumptions}
                    />
                </div>
            )}
        </React.Fragment>
    );
}
