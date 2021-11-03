import React from 'react';
import './styles/aptos-detail.css'
import axios from 'axios';
import calcUrls from './API';
import swal from 'sweetalert';

class AptosDetailTable extends React.Component {

    componentDidMount() {

        const myParams = window.location.href.replaceAll('%20', ' ').replace('&', '=').split('=');

        const APIApartmentDetailUrl = calcUrls().waterManager + '/water/apartment/apt-name/' + myParams[1] + '/bill-date?billDate=' + myParams[3]
        const headers = {
            'X-AccessToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.sllro1KBjuGXu33HB4IevHnM52fjpTN2HfwH7CI81UE'
        }
        axios.get(APIApartmentDetailUrl, {
            headers: headers
        })
            .then(function (response) {
                console.log(response.data);
                document.getElementById('apt-name').innerHTML = response.data.apartmentName + ' -- ' + response.data.billDate;
                document.getElementById('discount').innerHTML = '$' + response.data.consumptionDetail.discount
                document.getElementById('cleaning').innerHTML = '$' + response.data.consumptionDetail.cleaning
                document.getElementById('total').innerHTML = '$' + Math.round(response.data.consumptionDetail.total)
                document.getElementById('m3ResidentialBasic').innerHTML = Math.round(response.data.consumptionDetail.cubicMetersDetail.m3ResidentialBasic)
                document.getElementById('m3ResidentialBasicSuperior').innerHTML = Math.round(response.data.consumptionDetail.cubicMetersDetail.m3ResidentialBasicSuperior)
                // document.getElementById('totalM3Consumed').innerHTML = response.data.consumptionDetail.cubicMetersDetail.totalM3Consumed
                document.getElementById('acueResidentialValue').innerHTML = '$' + Math.round(response.data.consumptionDetail.acueductoDetail.residentialValue)
                document.getElementById('acueResidentialBasicValue').innerHTML = '$' + Math.round(response.data.consumptionDetail.acueductoDetail.residentialBasicValue)
                document.getElementById('acueResidentialBasicSuperiorValue').innerHTML = '$' + Math.round(response.data.consumptionDetail.acueductoDetail.residentialBasicSuperiorValue)
                document.getElementById('alcResidentialValue').innerHTML = '$' + Math.round(response.data.consumptionDetail.alcantarilladoDetail.residentialValue)
                document.getElementById('alcResidentialBasicValue').innerHTML = '$' + Math.round(response.data.consumptionDetail.alcantarilladoDetail.residentialBasicValue)
                document.getElementById('alcResidentialBasicSuperiorValue').innerHTML = '$' + Math.round(response.data.consumptionDetail.alcantarilladoDetail.residentialBasicSuperiorValue)
            })
            .catch(function (error) {
                swal({
                    title: "Datos incorrectos",
                    text: "La informacion solicitada no se encuentra en nuestra base de datos",
                    icon: "error",
                    button: "Continuar",
                })
            });
    }
    render() {
        return (
            <React.Fragment>
                <h2><span id="apt-name"></span></h2>
                <div className='col-12 col-lg-6 '>
                    <table className='table  table-sm table-hover'>
                        <thead>
                            <tr className='tableHeader'>
                                <th scope='col'>Descripcion</th>
                                <th scope='col'>Cantidad</th>
                                <th scope='col'>Tarifa - Valor unitario</th>
                                <th scope='col'>Valor a pagar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope='row'>[Acueducto] Cargo fijo residencial</th>
                                <td id=''></td>
                                <td id='acueResidentialValue'></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope='row'>[Acueducto] Consumo residencial básico</th>
                                <td id='m3ResidentialBasic'></td>
                                <td id='acueResidentialBasicValue'></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope='row'>[Acueducto] Consumo residencial superior a básico</th>
                                <td id='m3ResidentialBasicSuperior'></td>
                                <td id='acueResidentialBasicSuperiorValue'></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope='row'>[Alcantarillado] Cargo fijo residencial</th>
                                <td></td>
                                <td id='alcResidentialValue'></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope='row'>[Alcantarillado] Consumo residencial básico</th>
                                <td></td>
                                <td id='alcResidentialBasicValue'></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope='row'>[Alcantarillado] Consumo residencial superior a básico</th>
                                <td></td>
                                <td id='alcResidentialBasicSuperiorValue'></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope='row'>Total aseo</th>
                                <td>-</td>
                                <td>-</td>
                                <td id='cleaning'></td>
                            </tr>
                            <tr>
                                <th scope='row'>Descuentos</th>
                                <td>-</td>
                                <td>-</td>
                                <td id='discount'></td>
                            </tr>
                            <tr>
                                <th scope='row'>Valor a pagar</th>
                                <td>-</td>
                                <td>-</td>
                                <td id='total'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}
export default AptosDetailTable