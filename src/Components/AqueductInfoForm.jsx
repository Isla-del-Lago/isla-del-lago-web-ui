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
            acue_fijo_rsd > 0 &&
            acue_rsd_bsc > 0 &&
            acue_rsd_bsc_sup > 0
        ) {
            setButtonDisabled(false);
            setButtonState('enabled');
        }
        if (
            !acue_fijo_rsd ||
            !acue_rsd_bsc ||
            !acue_rsd_bsc_sup
        ) {
            setButtonDisabled(true);
            setButtonState('disabled');
        }
    }, [acue_fijo_rsd, acue_rsd_bsc, acue_rsd_bsc_sup]);

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
        props.onBackButton();
    };
    return (
        <Form className='customForm' onSubmit={submitHandler}>
            <span className='backButton' onClick={backButton}></span>
            <div className='customForm--title'>Acueducto $</div>
            <Input
                onChange={setacue_fijo_rsdHandler}
                type='number'
                placeHolder='Cargo fijo residencial'
                id='acue_fijo_rsdHandler'
                required={true}
            />
            <Input
                onChange={setacue_rsd_bscHandler}
                type='number'
                placeHolder='Consumo residencial básico'
                id='acue_rsd_bscHandler'
                required={true}
            />
            <Input
                onChange={setacue_rsd_bsc_supHandler}
                type='number'
                placeHolder='Consumo residencial superior a básico'
                id='acue_rsd_bsc_supHandler'
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
