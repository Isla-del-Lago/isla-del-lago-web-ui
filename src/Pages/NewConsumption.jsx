import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import AqueductInfoForm from '../Components/AqueductInfoForm';
import CubicMetersInfoForm from '../Components/CubicMetersInfoForm';
import MainBillInfoForm from '../Components/MainBillInfoForm';
import SewerageInfoForm from '../Components/SewerageInfoForm';
import utils from '../Components/Utils.json';
import './Styles/NewConsumption.css'
export default function NewConsumption(props) {
    const { userLoginState } = props;
    const [formConsumptionStep, setFormConsumptionStep] = useState(1);
    const formSectionCompleteHandler = () => {
        setFormConsumptionStep(formConsumptionStep + 1);
    };
    const onBackButtonHandler = () => {
        setFormConsumptionStep(formConsumptionStep - 1);
    };
    const submitHandler = () => {
        fetch(utils.urlBillBase + '/bill/create', {
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
                residentialFixedAqueduct: parseInt(
                    sessionStorage.getItem('acue_fijo_rsd')
                ),
                residentialBasicAqueduct: parseInt(
                    sessionStorage.getItem('acue_rsd_bsc')
                ),
                residentialBasicSuperiorAqueduct: parseInt(
                    sessionStorage.getItem('acue_rsd_bsc_sup')
                ),
                residentialFixedSewerage: parseInt(
                    sessionStorage.getItem('alc_fijo_rsd')
                ),
                residentialBasicSewerage: parseInt(
                    sessionStorage.getItem('alc_rsd_bsc')
                ),
                residentialBasicSuperiorSewerage: parseInt(
                    sessionStorage.getItem('alc_rsd_bsc_sup')
                ),
                cleaning: parseInt(sessionStorage.getItem('cleaning')),
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
                        document.location = '/';
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
                        <div className='formsContainer'>
                            <MainBillInfoForm
                                onFormComplete={formSectionCompleteHandler}
                                onBackButton={onBackButtonHandler}
                            />
                        </div>
                    )}
                    {formConsumptionStep === 2 && (
                        <div className='formsContainer'>
                            <CubicMetersInfoForm
                                onFormComplete={formSectionCompleteHandler}
                                onBackButton={onBackButtonHandler}
                            />
                        </div>
                    )}
                    {formConsumptionStep === 3 && (
                        <div className='formsContainer'>
                            <AqueductInfoForm
                                onFormComplete={formSectionCompleteHandler}
                                onBackButton={onBackButtonHandler}
                            />
                        </div>
                    )}
                    {formConsumptionStep === 4 && (
                        <div className='formsContainer'>
                            <SewerageInfoForm
                                onFormComplete={submitHandler}
                                onBackButton={onBackButtonHandler}
                            />
                        </div>
                    )}
                </>
            )}
        </React.Fragment>
    );
}
