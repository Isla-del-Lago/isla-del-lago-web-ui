import React from 'react';
import './styles/aptos-detail.css'
import axios from 'axios';
import calcUrls from './API';

class AptosDetailTable extends React.Component {
    discounts;
    cleaning;

    acueFijoResd;
    m3RsdBsc;
    acueRsdBsc;
    m3RsdBscSup;
    acueRsdBscSup;
    alcFijoResd;
    alcRsdBsc;
    alcRsdBscSup;

    componentDidMount() {
        this.discounts = document.getElementById('discounts')
        this.cleaning = document.getElementById('cleaning')
        this.acueFijoResd = document.getElementById('acueFijoResd')
        this.m3RsdBsc = document.getElementById('m3RsdBsc')
        this.acueRsdBsc = document.getElementById('acueRsdBsc')
        this.m3RsdBscSup = document.getElementById('m3RsdBscSup')
        this.acueRsdBscSup = document.getElementById('acueRsdBscSup')
        this.alcFijoResd = document.getElementById('alcFijoResd')
        this.alcRsdBsc = document.getElementById('alcRsdBsc')
        this.alcRsdBscSup = document.getElementById('alcRsdBscSup')


        const APIUrl = calcUrls().waterManager + '/water/bill/bill-date?billDate=13/10/2021 - 14/10/2021'
        const headers = {
            'X-AccessToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.sllro1KBjuGXu33HB4IevHnM52fjpTN2HfwH7CI81UE'
        }
        axios.get(APIUrl, {
            headers: headers
        })
            .then(function (response) {
                console.table(response.data);
                this.discounts.innerHTML = '$' + response.data.discounts;
                this.cleaning.innerHTML = '$' + response.data.cleaning;
                this.m3RsdBsc.innerHTML = response.data.m3RsdBsc + 'm3';
                this.m3RsdBscSup.innerHTML = response.data.m3RsdBscSup + 'm3';
                this.acueFijoResd.innerHTML = '$' + response.data.acueFijoResd;
                this.acueRsdBsc.innerHTML = '$' + response.data.acueRsdBsc;
                this.acueRsdBscSup.innerHTML = '$' + response.data.acueRsdBscSup;
                this.alcFijoResd.innerHTML = '$' + response.data.alcFijoResd;
                this.alcRsdBsc.innerHTML = '$' + response.data.alcRsdBsc;
                this.alcRsdBscSup.innerHTML = '$' + response.data.alcRsdBscSup;


            }.bind(this))

            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <React.Fragment>
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
                                <td id=''>824.35m3</td>
                                <td id='acueFijoResd'></td>
                                <td>$824.35</td>
                            </tr>
                            <tr>
                                <th scope='row'>[Acueducto] Consumo residencial básico</th>
                                <td id='m3RsdBsc'></td>
                                <td id='acueRsdBsc'></td>
                                <td>$943.61</td>
                            </tr>
                            <tr>
                                <th scope='row'>[Acueducto] Consumo residencial superior a básico</th>
                                <td id='m3RsdBscSup'></td>
                                <td id='acueRsdBscSup'></td>
                                <td>$4932.51</td>
                            </tr>
                            <tr>
                                <th scope='row'>[Alcantarillado] Cargo fijo residencial</th>
                                <td>391.53m3</td>
                                <td id='alcFijoResd'></td>
                                <td>$391.53</td>
                            </tr>
                            <tr>
                                <th scope='row'>[Alcantarillado] Consumo residencial básico</th>
                                <td>1686.44m3</td>
                                <td id='alcRsdBsc'></td>
                                <td>$974.27</td>
                            </tr>
                            <tr>
                                <th scope='row'>[Alcantarillado] Consumo residencial superior a básico</th>
                                <td>2810.74m3</td>
                                <td id='alcRsdBscSup'></td>
                                <td>$5092.79</td>
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
                                <td id='discounts'></td>
                            </tr>
                            <tr id='total'>
                                <th scope='row'>Valor a pagar</th>
                                <td>-</td>
                                <td>-</td>
                                <td id='total'>$11779</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}
export default AptosDetailTable