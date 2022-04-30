import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import DateInput from '../Components/DateInput';
import Form from '../Components/Form';
import Input from '../Components/Input';
export default function MainBillInfoForm(props) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonState, setButtonState] = useState('disabled');

    const [enteredStartDate, setEnteredStartDate] = useState('');
    const [enteredEndDate, setEnteredEndDate] = useState('');
    const [enteredDiscounts, setEnteredDiscounts] = useState('');
    const [enteredCleaning, setEnteredCleaning] = useState('');

    useEffect(() => {
        if (
            enteredStartDate.length > 0 &&
            enteredEndDate.length > 0 &&
            enteredEndDate.length > 0 &&
            enteredCleaning.length > 0
        ) {
            setButtonDisabled(false);
            setButtonState('enabled');
        }
        if (
            enteredStartDate.length === 0 ||
            enteredEndDate.length === 0 ||
            enteredEndDate.length === 0 ||
            enteredCleaning.length === 0
        ) {
            setButtonDisabled(true);
            setButtonState('disabled');
        }
    }, [enteredStartDate, enteredEndDate, enteredDiscounts, enteredCleaning]);

    const today = new Date();
    let maxDate;
    if (today.getMonth() < 9) {
        maxDate =
            today.getFullYear() +
            '-0' +
            parseInt(today.getMonth() + 1) +
            '-' +
            parseInt(today.getDate());
    } else {
        maxDate =
            today.getFullYear() +
            '-' +
            parseInt(today.getMonth() + 1) +
            '-' +
            parseInt(today.getDate());
    }
    const setStartDateHandler = (event) => {
        setEnteredStartDate(event.target.value + 'T00:00:01');
    };
    const setEndDateHandler = (event) => {
        setEnteredEndDate(event.target.value + 'T00:00:01');
    };
    const setDiscountsHandler = (event) => {
        setEnteredDiscounts(event.target.value);
    };

    const setCleaningHandler = (event) => {
        setEnteredCleaning(event.target.value);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        sessionStorage.setItem('startDate', enteredStartDate);
        sessionStorage.setItem('endDate', enteredEndDate);
        sessionStorage.setItem('discounts', enteredDiscounts);
        sessionStorage.setItem('cleaning', enteredCleaning);
        props.onFormComplete();
    };
    return (
        <Form className='customForm' onSubmit={submitHandler}>
            <div className='customForm--title'>Informacion de factura</div>
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
            />
            <Input
                onChange={setDiscountsHandler}
                type='number'
                placeHolder='Descuentos'
                required={true}
            />
            <Input
                onChange={setCleaningHandler}
                type='number'
                placeHolder='Aseo'
                required={true}
            />
            <Button
                state={buttonState}
                type='submit'
                text='Continuar'
                disabled={buttonDisabled}
            />
        </Form>
    );
}
