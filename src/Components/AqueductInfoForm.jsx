import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import Form from '../Components/Form';
import Input from '../Components/Input';
export default function AqueductInfoForm(props) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonState, setButtonState] = useState('disabled');

    const [acue_fijo_rsd, setacue_fijo_rsd] = useState('');
    const [acue_rsd_bsc, setacue_rsd_bsc] = useState('');
    const [acue_rsd_bsc_sup, setacue_rsd_bsc_sup] = useState('');

    useEffect(() => {
        if (
            acue_fijo_rsd.length > 0 &&
            acue_rsd_bsc.length > 0 &&
            acue_rsd_bsc_sup.length > 0
        ) {
            setButtonDisabled(false);
            setButtonState('enabled');
        }
        if (
            acue_fijo_rsd.length === 0 ||
            acue_rsd_bsc.length === 0 ||
            acue_rsd_bsc_sup.length === 0
        ) {
            setButtonDisabled(true);
            setButtonState('disabled');
        }
    }, [acue_fijo_rsd, acue_rsd_bsc, acue_rsd_bsc_sup]);

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
    const setacue_fijo_rsdHandler = (event) => {
        setacue_fijo_rsd(event.target.value);
    };
    const setacue_rsd_bscHandler = (event) => {
        setacue_rsd_bsc(event.target.value);
    };
    const setacue_rsd_bsc_supHandler = (event) => {
        setacue_rsd_bsc_sup(event.target.value);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        sessionStorage.setItem('acue_fijo_rsd', acue_fijo_rsd);
        sessionStorage.setItem('acue_rsd_bsc', acue_rsd_bsc);
        sessionStorage.setItem('acue_rsd_bsc_sup', acue_rsd_bsc_sup);
        props.onFormComplete();
    };
    const backButton = () => {
        props.onBackButton()
    };
    return (
        <Form className='customForm' onSubmit={submitHandler}>
            <span className='backButton' onClick={backButton}>
                <ion-icon name='caret-back-outline'></ion-icon>
            </span>
            <div className='customForm--title'>Acueducto $</div>
            <Input
                onChange={setacue_fijo_rsdHandler}
                type='number'
                placeHolder='Cargo fijo residencial'
                id='userEmail'
                required={true}
                maxDate={maxDate}
            />
            <Input
                onChange={setacue_rsd_bscHandler}
                type='number'
                placeHolder='Consumo residencial básico'
                id='userPassword'
                required={true}
                maxDate={maxDate}
            />
            <Input
                onChange={setacue_rsd_bsc_supHandler}
                type='number'
                placeHolder='Consumo residencial superior a básico'
                id='userPassword'
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
