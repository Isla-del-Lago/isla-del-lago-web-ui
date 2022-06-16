import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import AqueductInfoForm from '../Components/AqueductInfoForm';
import CubicMetersInfoForm from '../Components/CubicMetersInfoForm';
import MainBillInfoForm from '../Components/MainBillInfoForm';
import SewerageInfoForm from '../Components/SewerageInfoForm';
import Loader from '../Components/Loader';

import utils from '../Components/Utils.json';
import AuthContext from '../Components/Store/auth-context';

export default function NewBill() {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [loaderVisibility, setLoaderVisibility] = useState('invisible');

    const [formConsumptionStep, setFormConsumptionStep] = useState(1);

    const formSectionCompleteHandler = () => {
        setFormConsumptionStep(formConsumptionStep + 1);
    };
    const onBackButtonHandler = () => {
        setFormConsumptionStep(formConsumptionStep - 1);
    };
    const submitHandler = () => {
        setLoaderVisibility('visible');
        fetch(`${process.env.REACT_APP_BILL_URL}/api/v1/bill/create`, {
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
                    setLoaderVisibility('invisible');
                    Swal.fire({
                        text: 'Factura agregada con exito',
                        icon: 'success',
                        confirmButtonText: 'Continuar',
                    }).then(() => {
                        sessionStorage.setItem('billId', response.billId);
                        navigate('/calculate-percentages');
                    });
                }
                if (response.error) {
                    setLoaderVisibility('invisible');
                    Swal.fire({
                        title: response.errorCode,
                        text: response.error,
                        icon: 'error',
                        confirmButtonText: 'Continuar',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                    }).then(() => {
                        navigate('/');
                    });
                }
            })
            .catch((error) => {
                setLoaderVisibility('invisible');
                Swal.fire({
                    title: 'Error!' + error.State,
                    text: error.error,
                    icon: 'error',
                    confirmButtonText: 'Continuar',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                }).then(() => {
                    navigate('/');
                });
            });
    };
    return (
        <React.Fragment>
            <Loader visible={loaderVisibility} />
            {authCtx.userLoginState && (
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
