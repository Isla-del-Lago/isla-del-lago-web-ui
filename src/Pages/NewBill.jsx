import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import utils from '../Components/Utils.json';
import './Styles/NewBill.css';
import AqueductInfoForm from '../Components/AqueductInfoForm';
import CubicMetersInfoForm from '../Components/CubicMetersInfoForm';
import MainBillInfoForm from '../Components/MainBillInfoForm';
import SewerageInfoForm from '../Components/SewerageInfoForm';

export default function NewBill(props) {
    const { userLoginState, urlBillBase } = props;
    const [formConsumptionStep, setFormConsumptionStep] = useState(1);
    const formSectionCompleteHandler = () => {
        setFormConsumptionStep(formConsumptionStep + 1);
    };
    const onBackButtonHandler = () => {
        setFormConsumptionStep(formConsumptionStep - 1);
    };
    const submitHandler = () => {
        fetch(`${urlBillBase}/api/v1/bill/create`, {
            method: 'POST',
            headers: {
                'Content-Type': utils.headers['Content-Type'],
                'X-Uuid': sessionStorage.getItem('X-uuid'),
                Authorization: sessionStorage.getItem('Token'),
            },
            body: JSON.stringify({
                startDate: sessionStorage.getItem('startDate'),
                endDate: sessionStorage.getItem('endDate'),
                residentialBasicCubicMeters: parseInt(
                    sessionStorage.getItem('m3_rsd_bsc')
                ),
                residentialBasicSuperiorCubicMeters: parseInt(
                    sessionStorage.getItem('m3_rsd_bsc_sup')
                ),
                discounts: parseInt(sessionStorage.getItem('discounts')),
                residentialFixedAqueduct: parseFloat(
                    sessionStorage.getItem('acue_fijo_rsd')
                ),
                residentialBasicAqueduct: parseFloat(
                    sessionStorage.getItem('acue_rsd_bsc')
                ),
                residentialBasicSuperiorAqueduct: parseFloat(
                    sessionStorage.getItem('acue_rsd_bsc_sup')
                ),
                residentialFixedSewerage: parseFloat(
                    sessionStorage.getItem('alc_fijo_rsd')
                ),
                residentialBasicSewerage: parseFloat(
                    sessionStorage.getItem('alc_rsd_bsc')
                ),
                residentialBasicSuperiorSewerage: parseFloat(
                    sessionStorage.getItem('alc_rsd_bsc_sup')
                ),
                cleaning: parseFloat(sessionStorage.getItem('cleaning')),
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.billId > 0) {
                    Swal.fire({
                        text: 'Factura agregada con exito',
                        icon: 'success',
                        confirmButtonText: 'Continuar',
                    }).then(() => {
                        sessionStorage.setItem('billId', response.billId);
                        document.location = '/calculate-percentages';
                    });
                }
                if (response.error) {
                    Swal.fire({
                        title: response.errorCode,
                        text: response.error,
                        icon: 'error',
                        confirmButtonText: 'Continuar',
                    }).then(() => {
                        document.location = '/create-bill';
                    });
                }
            });
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
                <>
                    {formConsumptionStep === 1 && (
                        <MainBillInfoForm
                            onFormComplete={formSectionCompleteHandler}
                            onBackButton={onBackButtonHandler}
                        />
                    )}
                    {formConsumptionStep === 2 && (
                        <CubicMetersInfoForm
                            onFormComplete={formSectionCompleteHandler}
                            onBackButton={onBackButtonHandler}
                        />
                    )}
                    {formConsumptionStep === 3 && (
                        <AqueductInfoForm
                            onFormComplete={formSectionCompleteHandler}
                            onBackButton={onBackButtonHandler}
                        />
                    )}
                    {formConsumptionStep === 4 && (
                        <SewerageInfoForm
                            onFormComplete={submitHandler}
                            onBackButton={onBackButtonHandler}
                        />
                    )}
                </>
            )}
        </React.Fragment>
    );
}
