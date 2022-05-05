import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import Form from '../Components/Form';
import Input from '../Components/Input';
export default function CubicMetersInfoForm(props) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonState, setButtonState] = useState('disabled');

    const [m3_rsd_bsc, setm3_rsd_bsc] = useState('');
    const [m3_rsd_bsc_sup, setm3_rsd_bsc_sup] = useState('');

    useEffect(() => {
        if (
            m3_rsd_bsc.length > 0 &&
            m3_rsd_bsc_sup.length > 0 
        ) {
            setButtonDisabled(false);
            setButtonState('enabled');
        }
        if (
            m3_rsd_bsc.length === 0 ||
            m3_rsd_bsc_sup.length === 0 
        ) {
            setButtonDisabled(true);
            setButtonState('disabled');
        }
    }, [m3_rsd_bsc, m3_rsd_bsc_sup]);

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
    const setm3_rsd_bscHandler = (event) => {
        setm3_rsd_bsc(event.target.value);
    };
    const setm3_rsd_bsc_supHandler = (event) => {
        setm3_rsd_bsc_sup(event.target.value);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        sessionStorage.setItem('m3_rsd_bsc', m3_rsd_bsc);
        sessionStorage.setItem('m3_rsd_bsc_sup', m3_rsd_bsc_sup);
        props.onFormComplete()
    };
    const backButton = () => {
        props.onBackButton()
    };
    return (
        <Form className='customForm' onSubmit={submitHandler}>
            <span className='backButton' onClick={backButton}>
                <ion-icon name='caret-back-outline'></ion-icon>
            </span>
            <div className='customForm--title'>Consumos m3</div>
            <Input
                onChange={setm3_rsd_bscHandler}
                type='number'
                placeHolder='Consumo residencial básico'
                id='userEmail'
                required={true}
                maxDate={maxDate}
            />
            <Input
                onChange={setm3_rsd_bsc_supHandler}
                type='number'
                placeHolder='Consumo residencial superior a básico'
                id='userPassword'
                required={true}
                maxDate={maxDate}
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
