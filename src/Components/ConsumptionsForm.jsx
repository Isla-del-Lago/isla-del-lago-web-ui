import React from 'react';
import Input from './Input';

export default function ConsumptionsForm(props) {
    const { firstApartment, secondApartment } = props;


    const setConsumptionValue = (event) => {
        sessionStorage.setItem(event.target.id, event.target.value);
    };
    return (
        <React.Fragment>
            <Input
                label={firstApartment}
                labelType='principalLabel'
                id={firstApartment}
                key={firstApartment}
                onChange={setConsumptionValue}
                type='number'
                required={true}
            />
            <Input
                label={secondApartment}
                labelType='principalLabel'
                id={secondApartment}
                key={secondApartment}
                onChange={setConsumptionValue}
                type='number'
                required={true}
            />
        </React.Fragment>
    );
}
