import React from "react";
import './styles/forms.css'
import swal from 'sweetalert';
import axios from 'axios';
import url from "./API";

class ConsumptionForm extends React.Component {
    apto201;
    apto202;
    apto301;
    apto302;
    apto401;
    apto402;
    apto501;
    apto502;
    local1;
    local2;
    button;
    componentDidMount() {
        console.log(process.env);
        this.apto201 = document.getElementById('Apto-201')
        this.apto202 = document.getElementById('Apto-202')
        this.apto301 = document.getElementById('Apto-301')
        this.apto302 = document.getElementById('Apto-302')
        this.apto401 = document.getElementById('Apto-401')
        this.apto402 = document.getElementById('Apto-402')
        this.apto501 = document.getElementById('Apto-501')
        this.apto502 = document.getElementById('Apto-502')
        this.local1 = document.getElementById('Local-1')
        this.local2 = document.getElementById('Local-2')
        this.button = document.getElementById('consumptionsBtn')
    }
    handleChange = () => {
        const isFormNotEmpty =
            this.apto201.value === "" ||
            this.apto202.value === '' ||
            this.apto301.value === '' ||
            this.apto302.value === '' ||
            this.apto401.value === '' ||
            this.apto402.value === '' ||
            this.apto501.value === '' ||
            this.apto502.value === '' ||
            this.local1.value === '' ||
            this.local2.value === '';
        isFormNotEmpty ? this.button.disabled = (true) : this.button.disabled = (false)
    };

    submit = () => {
        const APIUrl = url.urlApi + '/water/consumption'
        const headers = {
            'X-AccessToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.sllro1KBjuGXu33HB4IevHnM52fjpTN2HfwH7CI81UE'
        }
        const apartmentNames = ['Apto-201', 'Apto-202', 'Apto-301', 'Apto-302',
            'Apto-401', 'Apto-402', 'Apto-501', 'Apto-502', 'Local-1', 'Local-2']
        apartmentNames.forEach(apartmentName => {
            const consumptionDetail = {
                apartmentName: apartmentName.replace('-', ' '),
                billDate: sessionStorage.billDate,
                meterValue: document.getElementById(apartmentName).value,
                valuePhotoUrl: 'null'
            }

            axios.post(APIUrl, consumptionDetail, {
                headers: headers
            })
                .then(function (response) {
                    console.log(response);
                    swal({
                        title: "Datos guardados",
                        text: "Sus consumos se registraron exitosamente",
                        icon: "success",
                        button: "Continuar",
                    })
                        .then(function () {
                            window.location = "/aptos-detail";
                        });
                })
                .catch(function (error) {
                    swal({
                        title: "Algo ha salido mal",
                        text: "Ingrese los datos nuevamente",
                        icon: "error",
                        button: "Continuar",
                    })
                        .then(function () {
                            window.location = "/consumption";
                        });
                });

        });

    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <form className="col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <span className="form-title">Informacion de consúmos por apartamento</span>
                        <label for="apto201">Apartamento 201</label>
                        <input required onChange={this.handleChange} type="number" id="Apto-201" />
                        <label for="apto202">Apartamento 202</label>
                        <input required onChange={this.handleChange} type="number" id="Apto-202" />
                        <label for="apto301">Apartamento 301</label>
                        <input required onChange={this.handleChange} type="number" id="Apto-301" />
                        <label for="apto302">Apartamento 302</label>
                        <input required onChange={this.handleChange} type="number" id="Apto-302" />
                        <label for="apto401">Apartamento 401</label>
                        <input required onChange={this.handleChange} type="number" id="Apto-401" />
                        <label for="apto402">Apartamento 402</label>
                        <input required onChange={this.handleChange} type="number" id="Apto-402" />
                        <label for="apto501">Apartamento 501</label>
                        <input required onChange={this.handleChange} type="number" id="Apto-501" />
                        <label for="apto502">Apartamento 502</label>
                        <input required onChange={this.handleChange} type="number" id="Apto-502" />
                        <label for="local1">Local 1</label>
                        <input required onChange={this.handleChange} type="number" id="Local-1" />
                        <label for="local2">Local 2</label>
                        <input required onChange={this.handleChange} type="number" id="Local-2" />
                        <button disabled={true} type="button" className="btn-isla-del-lago btn" id="consumptionsBtn">
                            <div onClick={this.submit} id="link">
                                <div className="text-container">
                                    Siguiente
                                </div>
                            </div>
                        </button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
export default ConsumptionForm