import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import DateInput from '../Components/DateInput';
import Form from '../Components/Form';
import Input from '../Components/Input';
import { CloseButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function MainBillInfoForm(props) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonState, setButtonState] = useState('disabled');

    const [enteredMinDate, setEnteredMinDate] = useState('');

    const [enteredStartDate, setEnteredStartDate] = useState('');
    const [enteredEndDate, setEnteredEndDate] = useState('');
    const [enteredDiscounts, setEnteredDiscounts] = useState('');
    const [enteredCleaning, setEnteredCleaning] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (
            enteredStartDate.length > 0 &&
            enteredEndDate.length > 0 &&
            enteredDiscounts.length > 0 &&
            enteredCleaning.length > 0
        ) {
            setButtonDisabled(false);
            setButtonState('enabled');
        }
        if (
            enteredStartDate.length === 0 ||
            enteredEndDate.length === 0 ||
            enteredDiscounts.length === 0 ||
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
            today.getFullYear() + '-0' + parseInt(today.getMonth() + 1) + '-';
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
    const setStartDateHandler = (event) => {
        setEnteredMinDate(event.target.value);
        setEnteredStartDate(event.target.value);
    };
    const setEndDateHandler = (event) => {
        setEnteredEndDate(event.target.value);
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
    const closeFormHandler = () => {
        navigate('/home');
    };
    return (
        <Form className='customForm' onSubmit={submitHandler}>
            <div className='formHeader'>
                <CloseButton onClick={closeFormHandler} />
                <div className='customForm--title'>
                    Informacion de la factura
                </div>
            </div>
            <div className='formBody'>
                <div className='principalLabel'>Periodo facturado</div>
                <DateInput
                    onChange={setStartDateHandler}
                    autoFocus={true}
                    type='date'
                    id='startDate'
                    label='Fecha inicial'
                    labelType='subLabel'
                    required={true}
                    maxDate={maxDate}
                />
                <DateInput
                    onChange={setEndDateHandler}
                    type='date'
                    id='endDate'
                    label='Fecha final'
                    labelType='subLabel'
                    required={true}
                    maxDate={maxDate}
                    minDate={enteredMinDate}
                />
                <Input
                    onChange={setDiscountsHandler}
                    type='number'
                    label='Descuentos ($)'
                    labelType='principalLabel'
                    required={true}
                />
                <Input
                    onChange={setCleaningHandler}
                    type='number'
                    label='Aseo ($)'
                    labelType='principalLabel'
                    required={true}
                />
            </div>
                <div className='buttonsContainer'>
                <Button
                    type='button'
                    onClick={closeFormHandler}
                    text='Cancelar'
                />
                <Button
                    state={buttonState}
                    type='submit'
                    text='Continuar'
                    disabled={buttonDisabled}
                />
            </div>
        </Form>
    );
}
