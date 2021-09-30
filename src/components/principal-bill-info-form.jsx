import React from "react";
import './styles/forms.css'
import { Link } from "react-router-dom";
import swal from 'sweetalert';

class PrincipalBillInfoForm extends React.Component {
    // myStorage = window.sessionStorage;
    startBillingDate
    endBillingDate
    discounts
    discountsValue
    cleaning
    cleaningValue
    button
    today
    componentDidMount() {
        this.startBillingDate = document.getElementById('start-billing-date')
        this.endBillingDate = document.getElementById('end-billing-date')
        this.discounts = document.getElementById('discounts')
        this.discountsValue = this.discounts.value
        this.cleaningValue = this.discounts.value
        this.cleaning = document.getElementById('cleaning')
        this.button = document.getElementById('principalBillInfoBtn')
        this.today = new Date();


        var dd = this.today.getDate();
        var mm = this.today.getMonth() + 1;
        var yyyy = this.today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        this.today = yyyy + '-' + mm + '-' + dd;

        this.startBillingDate.setAttribute("max", this.today);
        this.endBillingDate.setAttribute("max", this.today);
        sessionStorage.clear();
    }


    handleChange = () => {
        if (this.startBillingDate.value >= this.endBillingDate.value) {
            swal({
                title: "Error",
                text: "La fecha final debe ser mayor a la fecha inicial",
                icon: "warning",
                button: "Continuar",
            });
            this.startBillingDate.value = ''
        }
        if (this.endBillingDate.value > this.today) {
            swal({
                title: "Error",
                text: "Fecha invalida",
                icon: "warning",
                button: "Continuar",
            });
            this.endBillingDate.value = ''
        }
        if (this.startBillingDate.value === "" || this.endBillingDate.value === '' || this.discounts.value === '' || this.cleaning.value === '') {
            this.button.disabled = (true)
        }
        else {
            this.button.disabled = (false)
        }
        this.discountsValue = parseInt(this.discounts.value, 10)
        this.cleaningValue = parseInt(this.cleaning.value, 10)

    };
    submit = () => {

        let startBillingDateSplit = this.startBillingDate.value.split('-');
        let startBillingDateOrdered = startBillingDateSplit[2] + '/' + startBillingDateSplit[1] + '/' + startBillingDateSplit[0]

        let endBillingDateSplit = this.endBillingDate.value.split('-');
        let endBillingDateOrdered = endBillingDateSplit[2] + '/' + endBillingDateSplit[1] + '/' + endBillingDateSplit[0]
        let completeDate = startBillingDateOrdered + ' - ' + endBillingDateOrdered

        sessionStorage.setItem('billDate', completeDate);
        sessionStorage.setItem('discounts', this.discountsValue)
        sessionStorage.setItem('cleaning', this.cleaningValue)
    }
    render() {
        return (
            <React.Fragment >
                <div className="container-fluid">
                    <form className="col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4" >
                        <span className="form-title">Ingrese los datos de su factura</span>
                        <label for="start-billing-date">Inicio periodo de facturación</label>
                        <input required type="date" id="start-billing-date" name="trip-start"
                            min="2000-01-01" />
                        <label for="end-billing-date">Final periodo de facturación</label>
                        <input required onChange={this.handleChange} type="date" id="end-billing-date" name="trip-start"
                            min="2000-01-01" />
                        <label for="discounts">Descuentos ($)</label>
                        <input required onChange={this.handleChange} type="number" id="discounts" />
                        <label for="cleaning">Valor aseo ($)</label>
                        <input required onChange={this.handleChange} type="number" id="cleaning" />
                        <button disabled={true} to='/aqueduct' type="button" className="btn-isla-del-lago btn" id="principalBillInfoBtn">
                            <Link to='/aqueduct' id="link" onClick={this.submit}>
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
export default PrincipalBillInfoForm