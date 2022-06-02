import React from 'react';
import './Styles/ApartmentConsumptionTable.css';
export default function ApartmentConsumptionTable(props) {
    const {
        residentialBasicCubicMeters,
        residentialBasicSuperiorCubicMeters,
        residentialFixedAqueductFee,
        residentialBasicAqueductFee,
        residentialBasicSuperiorAqueductFee,
        residentialFixedSewerageFee,
        residentialBasicSewerageFee,
        residentialBasicSuperiorSewerageFee,
        residentialFixedAqueduct,
        residentialBasicAqueduct,
        residentialBasicSuperiorAqueduct,
        residentialFixedSewerage,
        residentialBasicSewerage,
        residentialBasicSuperiorSewerage,
        cleaning,
        discounts,
        total,
    } = props;
    return (
        <React.Fragment>
            <div className='formsContainer'>
                <table className='table table-dark table-striped consumptionTable'>
                    <thead>
                        <tr>
                            <th scope='col'>Descripcion</th>
                            <th scope='col'>Cantidad</th>
                            <th scope='col'>Tarifa-Valor unitario</th>
                            <th scope='col'>Valor a pagar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'>
                                Acueducto: cargo fijo residencial
                            </th>
                            <td>1 m<sup>3</sup></td>
                            <td>${residentialFixedAqueductFee}</td>
                            <td>${residentialFixedAqueduct}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                Acueducto: consumo residencial basico
                            </th>
                            <td>{residentialBasicCubicMeters} m<sup>3</sup></td>
                            <td>${residentialBasicAqueductFee}</td>
                            <td>${residentialBasicAqueduct}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                Acueducto: consumo residencial superior a basico
                            </th>
                            <td>{residentialBasicSuperiorCubicMeters} m<sup>3</sup></td>
                            <td>${residentialBasicSuperiorAqueductFee}</td>
                            <td>${residentialBasicSuperiorAqueduct}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                Alcantarillado: cargo fijo residencial
                            </th>
                            <td>1 m<sup>3</sup></td>
                            <td>${residentialFixedSewerageFee}</td>
                            <td>${residentialFixedSewerage}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                Alcantarillado: consumo residencial basico
                            </th>
                            <td>{residentialBasicCubicMeters} m<sup>3</sup></td>
                            <td>${residentialBasicSewerageFee}</td>
                            <td>${residentialBasicSewerage}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                Alcantarillado: consumo residencial superior a
                                basico
                            </th>
                            <td>{residentialBasicSuperiorCubicMeters} m<sup>3</sup></td>
                            <td>${residentialBasicSuperiorSewerageFee}</td>
                            <td>${residentialBasicSuperiorSewerage}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Total aseo</th>
                            <td></td>
                            <td></td>
                            <td>${cleaning}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Descuentos</th>
                            <td></td>
                            <td></td>
                            <td>${discounts}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Valor a pagar</th>
                            <td></td>
                            <td></td>
                            <td>${total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}
