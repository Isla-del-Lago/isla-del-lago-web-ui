import React from 'react'
import { Link } from 'react-router-dom'
import './styles/forms.css'
import swal from 'sweetalert';
import axios from 'axios';

class SewerBillInfoForm extends React.Component {
    API = 'http://localhost:8080/water/bill';
    alcFijoResd;
    alcRsdBsc;
    alcRsdBscSup;
    button;
    request;
    datos;

    componentDidMount() {
        this.alcFijoResd = document.getElementById('alcFijoResd')
        this.alcRsdBsc = document.getElementById('alcRsdBsc')
        this.alcRsdBscSup = document.getElementById('alcRsdBscSup')
        this.button = document.getElementById('sewerBillInfoBtn')
    }
    handleChange = () => {
        const isFormNotEmpty = this.alcFijoResd.value === "" || this.alcRsdBsc.value === '' || this.alcRsdBscSup.value === '';
        isFormNotEmpty ? this.button.disabled = (true) : this.button.disabled = (false)

    };
    submit = () => {
        const alcFijoResd = parseFloat(this.alcFijoResd.value)
        const alcRsdBsc = parseFloat(this.alcRsdBsc.value)
        const alcRsdBscSup = parseFloat(this.alcRsdBscSup.value)

        sessionStorage.setItem('alcFijoResd', alcFijoResd);
        sessionStorage.setItem('alcRsdBsc', alcRsdBsc);
        sessionStorage.setItem('alcRsdBscSup', alcRsdBscSup);
        console.table(sessionStorage)
        this.datos = {
            billDate: sessionStorage.billDate,
            m3RsdBsc: parseInt(sessionStorage.m3RsdBsc),
            m3RsdBscSup: parseInt(sessionStorage.m3RsdBscSup),
            discounts: parseInt(sessionStorage.discounts),
            acueFijoResd: parseFloat(sessionStorage.acueFijoResd),
            acueRsdBsc: parseFloat(sessionStorage.acueRsdBsc),
            acueRsdBscSup: parseFloat(sessionStorage.acueRsdBscSup),
            alcFijoResd: parseFloat(sessionStorage.alcFijoResd),
            alcRsdBsc: parseFloat(sessionStorage.alcRsdBsc),
            alcRsdBscSup: parseInt(sessionStorage.alcRsdBscSup),
            cleaning: parseInt(sessionStorage.cleaning)
        }
        console.log(this.datos);

        axios.post(this.API, this.datos)
            .then(function (response) {
                console.log(response);
                swal({
                    title: "Factura guardada",
                    text: "Su factura se registro exitosamente",
                    icon: "success",
                    button: "Continuar",
                });
            })
            .catch(function (error) {
                swal({
                    title: "Error interno",
                    text: "Por favor inténtelo más tarde",
                    icon: "error",
                    button: "Continuar",
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <form className="col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <span className="form-title">Información de alcantarillado de su factura</span>
                        <label for="alcFijoResd">Cargo fijo residencial</label>
                        <input required onChange={this.handleChange} type="number" id="alcFijoResd" />
                        <label for="alcRsdBsc">Consumo residencial basico </label>
                        <input required onChange={this.handleChange} type="number" id="alcRsdBsc" />
                        <label for="alcRsdBscSup">Consumo residencial superior a basico</label>
                        <input required onChange={this.handleChange} type="number" id="alcRsdBscSup" />
                        <button disabled={true} type="button" className="btn-isla-del-lago btn" id="sewerBillInfoBtn">
                            <Link to='/consumptions' id="link" onClick={this.submit}>
                                <div className="text-container">
                                    Terminar
                                </div>
                            </Link>
                        </button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
export default SewerBillInfoForm