import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import Form from '../Components/Form';
import Input from '../Components/Input';
import { CloseButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SewerageInfoForm(props) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonState, setButtonState] = useState('disabled');

    const [alc_fijo_rsd, setalc_fijo_rsd] = useState('');
    const [alc_rsd_bsc, setalc_rsd_bsc] = useState('');
    const [alc_rsd_bsc_sup, setalc_rsd_bsc_sup] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (
            alc_fijo_rsd.length > 0 &&
            alc_rsd_bsc.length > 0 &&
            alc_rsd_bsc_sup.length > 0
        ) {
            setButtonDisabled(false);
            setButtonState('enabled');
        }
        if (
            alc_fijo_rsd.length === 0 ||
            alc_rsd_bsc.length === 0 ||
            alc_rsd_bsc_sup.length === 0
        ) {
            setButtonDisabled(true);
            setButtonState('disabled');
        }
    }, [alc_fijo_rsd, alc_rsd_bsc, alc_rsd_bsc_sup]);

    const setalc_fijo_rsdHandler = (event) => {
        setalc_fijo_rsd(event.target.value);
    };
    const setalc_rsd_bscHandler = (event) => {
        setalc_rsd_bsc(event.target.value);
    };
    const setalc_rsd_bsc_supHandler = (event) => {
        setalc_rsd_bsc_sup(event.target.value);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        sessionStorage.setItem('alc_fijo_rsd', alc_fijo_rsd);
        sessionStorage.setItem('alc_rsd_bsc', alc_rsd_bsc);
        sessionStorage.setItem('alc_rsd_bsc_sup', alc_rsd_bsc_sup);
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
                <div className='principalLabel'>Alcantarillado ($)</div>
                <Input
                    onChange={setalc_fijo_rsdHandler}
                    type='number'
                    label='Cargo fijo residencial'
                    labelType='subLabel'
                    id='alc_fijo_rsdHandler'
                    required={true}
                />
                <Input
                    onChange={setalc_rsd_bscHandler}
                    type='number'
                    label='Consumo residencial básico'
                    labelType='subLabel'
                    id='alc_rsd_bscHandler'
                    required={true}
                />
                <Input
                    onChange={setalc_rsd_bsc_supHandler}
                    type='number'
                    label='Consumo residencial superior a básico'
                    labelType='subLabel'
                    id='alc_rsd_bsc_supHandler'
                    required={true}
                />
            </div>
            <div className='buttonsContainer'>
                <Button type='reset' text='Regresar' onClick={backButton} />
                <Button
                    state={buttonState}
                    type='submit'
                    text='Guardar'
                    disabled={buttonDisabled}
                />
            </div>
        </Form>
    );
}
