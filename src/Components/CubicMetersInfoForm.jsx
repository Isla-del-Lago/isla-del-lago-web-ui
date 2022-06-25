import React, { useEffect, useState } from 'react';
import { CloseButton } from 'react-bootstrap';
import Button from '../Components/Button';
import Form from '../Components/Form';
import Input from '../Components/Input';
import { useNavigate } from 'react-router-dom';

export default function CubicMetersInfoForm(props) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonState, setButtonState] = useState('disabled');

    const [m3_rsd_bsc, setm3_rsd_bsc] = useState('');
    const [m3_rsd_bsc_sup, setm3_rsd_bsc_sup] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (m3_rsd_bsc.length > 0 && m3_rsd_bsc_sup.length > 0) {
            setButtonDisabled(false);
            setButtonState('enabled');
        }
        if (m3_rsd_bsc.length === 0 || m3_rsd_bsc_sup.length === 0) {
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
        props.onFormComplete();
    };
    const closeFormHandler = () => {
        navigate('/home');
    };
    const backButton = () => {
        props.onBackButton();
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
                <div className='principalLabel'>
                    Consumos (m<sup>3</sup>)
                </div>
                <Input
                    onChange={setm3_rsd_bscHandler}
                    type='number'
                    label='Consumo residencial básico'
                    labelType='subLabel'
                    id='userEmail'
                    required={true}
                    maxDate={maxDate}
                />
                <Input
                    onChange={setm3_rsd_bsc_supHandler}
                    type='number'
                    label='Consumo residencial superior a básico'
                    labelType='subLabel'
                    id='userPassword'
                    required={true}
                    maxDate={maxDate}
                />
            </div>
            <div className='buttonsContainer'>
                <Button type='reset' text='Regresar' onClick={backButton} />
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
