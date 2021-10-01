import React from 'react'
import { Link } from 'react-router-dom'
import './styles/forms.css'
// import swal from 'sweetalert';


class AqueductBillInfoForm extends React.Component {
    m3RsdBsc
    m3RsdBscSup
    button
    componentDidMount() {
        this.m3RsdBsc = document.getElementById('m3RsdBsc')
        this.m3RsdBscSup = document.getElementById('m3RsdBscSup')
        this.button = document.getElementById('aqueductBillInfoBtn')
    }
    handleChange = () => {

        const isFormNotEmpty = this.m3RsdBsc.value === "" || this.m3RsdBscSup.value === '';
        isFormNotEmpty ? this.button.disabled = (true) : this.button.disabled = (false)

    };
    submit = () => {
        const m3RsdBsc = parseInt(this.m3RsdBsc.value)
        const m3RsdBscSup = parseInt(this.m3RsdBscSup.value)
        sessionStorage.setItem('m3RsdBsc', m3RsdBsc);
        sessionStorage.setItem('m3RsdBscSup', m3RsdBscSup);
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <form className="col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <span className="form-title">Informacion de metros cubicos de su factura</span>
                        <label for="m3RsdBsc">Consumo residencial basico (m3) </label>
                        <input required onChange={this.handleChange} type="number" id="m3RsdBsc" />
                        <label for="m3RsdBscSup">Consumo residencial superior a basico (m3) </label>
                        <input required onChange={this.handleChange} type="number" id="m3RsdBscSup" />
                        <button disabled={true} type="button" className="btn-isla-del-lago btn" id="aqueductBillInfoBtn">
                            <Link to='/aqueduct2' onClick={this.submit} id="link">
                                <div className="text-container">
                                    Siguiente
                                </div>
                            </Link>
                        </button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
export default AqueductBillInfoForm