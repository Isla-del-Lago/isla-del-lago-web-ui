import React from 'react';
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
        apartment,
    } = props;
    return (
        <React.Fragment>
            <div className='formsContainer'>
                <div className='consumptionCard card'>
                    <div className='cardRow'>
                        <div className='cardHeader'>
                            <div className='cardRowBlock'>
                                <h2 className='cardRowBlock-title'>
                                    Apartamento:
                                </h2>
                                <h4 className='cardRowBlock-subtitle'>
                                    {apartment}
                                </h4>
                            </div>
                            <div className='cardRowBlock'>
                                <h2 className='cardRowBlock-title'>${total}</h2>
                                <h4 className='cardRowBlock-subtitle'>
                                    Total a pagar
                                </h4>
                            </div>
                        </div>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                Acue: cargo fijo residencial
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                1 m<sup>3</sup>
                            </h4>
                        </div>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                ${residentialFixedAqueduct}
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                Valor Unitario: ${residentialFixedAqueductFee}
                            </h4>
                        </div>
                    </div>
                    <div className='cardRow'>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                Acue: consumo residencial basico
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                {residentialBasicCubicMeters} m<sup>3</sup>
                            </h4>
                        </div>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                ${residentialBasicAqueduct}
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                Valor Unitario: ${residentialBasicAqueductFee}
                            </h4>
                        </div>
                    </div>
                    <div className='cardRow'>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                Acue: consumo residencial superior a basico
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                {residentialBasicSuperiorCubicMeters} m
                                <sup>3</sup>
                            </h4>
                        </div>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                ${residentialBasicSuperiorAqueduct}
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                Valor Unitario: $
                                {residentialBasicSuperiorAqueductFee}
                            </h4>
                        </div>
                    </div>
                    <div className='cardRow'>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                Alc: cargo fijo residencial
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                1 m<sup>3</sup>
                            </h4>
                        </div>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                ${residentialFixedSewerage}
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                Valor Unitario: ${residentialFixedSewerageFee}
                            </h4>
                        </div>
                    </div>
                    <div className='cardRow'>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                Alc: consumo residencial basico
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                {residentialBasicCubicMeters} m<sup>3</sup>
                            </h4>
                        </div>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                ${residentialBasicSewerage}
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                Valor Unitario: ${residentialBasicSewerageFee}
                            </h4>
                        </div>
                    </div>
                    <div className='cardRow'>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                Alc: consumo residencial superior a basico
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                {residentialBasicSuperiorCubicMeters} m
                                <sup>3</sup>
                            </h4>
                        </div>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>
                                ${residentialBasicSuperiorSewerage}
                            </h2>
                            <h4 className='cardRowBlock-subtitle'>
                                Valor Unitario: $
                                {residentialBasicSuperiorSewerageFee}
                            </h4>
                        </div>
                    </div>
                    <div className='cardRow'>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>Total aseo</h2>
                        </div>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>${cleaning}</h2>
                        </div>
                    </div>
                    <div className='cardRow'>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>Descuentos</h2>
                        </div>
                        <div className='cardRowBlock'>
                            <h2 className='cardRowBlock-title'>${discounts}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='tableContainer'>
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
                            <td>
                                1 m<sup>3</sup>
                            </td>
                            <td>${residentialFixedAqueductFee}</td>
                            <td>${residentialFixedAqueduct}</td>
                        </tr>


                        <tr>
                            <th scope='row'>
                                Acueducto: consumo residencial basico
                            </th>
                            <td>
                                {residentialBasicCubicMeters} m<sup>3</sup>
                            </td>
                            <td>${residentialBasicAqueductFee}</td>
                            <td>${residentialBasicAqueduct}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                Acueducto: consumo residencial superior a basico
                            </th>
                            <td>
                                {residentialBasicSuperiorCubicMeters} m
                                <sup>3</sup>
                            </td>
                            <td>${residentialBasicSuperiorAqueductFee}</td>
                            <td>${residentialBasicSuperiorAqueduct}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                Alcantarillado: cargo fijo residencial
                            </th>
                            <td>
                                1 m<sup>3</sup>
                            </td>
                            <td>${residentialFixedSewerageFee}</td>
                            <td>${residentialFixedSewerage}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                Alcantarillado: consumo residencial basico
                            </th>
                            <td>
                                {residentialBasicCubicMeters} m<sup>3</sup>
                            </td>
                            <td>${residentialBasicSewerageFee}</td>
                            <td>${residentialBasicSewerage}</td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                Alcantarillado: consumo residencial superior a
                                basico
                            </th>
                            <td>
                                {residentialBasicSuperiorCubicMeters} m
                                <sup>3</sup>
                            </td>
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
            </div> */}
        </React.Fragment>
    );
}
