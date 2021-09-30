import React from 'react'
import { Link } from 'react-router-dom'
import './styles/forms.css'
// import swal from 'sweetalert';


class AqueductBillInfoForm2 extends React.Component {
    acueFijoResd
    acueRsdBsc
    acueRsdBscSup
    button
    componentDidMount(){
        this.acueFijoResd = document.getElementById('acueFijoResd')
        this.acueRsdBsc = document.getElementById('acueRsdBsc')
        this.acueRsdBscSup = document.getElementById('acueRsdBscSup')
        this.button = document.getElementById('aqueduct2BillInfoBtn')
    }
    handleChange = () => {
        if (this.acueFijoResd.value === '' || this.acueRsdBsc.value === "" || this.acueRsdBscSup.value === '') {
            this.button.disabled = (true)
        }
        else {
            this.button.disabled = (false)
        }
    };
    submit = () => {
        let acueFijoResd = parseFloat(this.acueFijoResd.value)
        let acueRsdBsc = parseFloat(this.acueRsdBsc.value)
        let acueRsdBscSup = parseFloat(this.acueRsdBscSup.value)
        
        sessionStorage.setItem('acueFijoResd',acueFijoResd);
        sessionStorage.setItem('acueRsdBsc',acueRsdBsc);
        sessionStorage.setItem('acueRsdBscSup',acueRsdBscSup);
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <form className="col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <span className="form-title">Información de acueducto de su factura</span>
                        <label for="acueFijoResd">Cargo fijo residencial</label>
                        <input required onChange={this.handleChange} type="number" id="acueFijoResd" />
                        <label for="acueRsdBsc">Consumo residencial basico</label>
                        <input required onChange={this.handleChange} type="number" id="acueRsdBsc" />
                        <label for="acueRsdBscSup">Acueducto residencial basico superior</label>
                        <input required onChange={this.handleChange} type="number" id="acueRsdBscSup" />
                        <button disabled={true} type="button" className="btn-isla-del-lago btn" id="aqueduct2BillInfoBtn">
                            <Link to='/sewer' onClick={this.submit} id="link">
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
export default AqueductBillInfoForm2