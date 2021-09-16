import React from "react";
import './styles/principal-bill-info-form.css'

class PrincipalBillInfoForm extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <form className="col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <span className="form-title">Ingrese los datos de su factura</span>
                        <label for="start-billing-date">Inicio periodo de facturación</label>
                        <input required type="date" id="start-billing-date" name="trip-start"
                            min="2000-01-01" />
                        <label for="end-billing-date">Final periodo de facturación</label>
                        <input required type="date" id="end-billing-date" name="trip-start"
                            min="2000-01-01" />
                        <label for="discounts" className="form-label">Descuentos $</label>
                        <input required type="number" id="discounts" />
                        <label for="cleaning" className="form-label">Valor limpieza $</label>
                        <input required type="number" id="cleaning" />
                        <button disabled={true} type="button" className="btn btn-success" id="principal-bill-info-btn">Siguiente</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
export default PrincipalBillInfoForm