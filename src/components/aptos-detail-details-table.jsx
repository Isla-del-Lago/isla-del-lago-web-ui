import React from "react";
import './styles/aptos-detail.css'

class AptosDetailTable extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-12 col-lg-6">
                    <table className="table table-striped table-hover bg-light border border-dark">
                        <thead>
                            <tr>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Tarifa - Valor unitario</th>
                                <th scope="col">Valor a pagar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">[Acueducto] Cargo fijo residencial</th>
                                <td>1.00m3</td>
                                <td>$824.35</td>
                                <td>$824.35</td>
                            </tr>
                            <tr>
                                <th scope="row">[Acueducto] Consumo residencial básico</th>
                                <td>0.58m3</td>
                                <td>$1633.36</td>
                                <td>$943.61</td>
                            </tr>
                            <tr>
                                <th scope="row">[Acueducto] Consumo residencial superior a básico</th>
                                <td>1.81m3</td>
                                <td>$2722.28</td>
                                <td>$4932.51</td>
                            </tr>
                            <tr>
                                <th scope="row">[Alcantarillado] Consumo residencial superior a básico</th>
                                <td>1.00m3</td>
                                <td>$391.53</td>
                                <td>$391.53</td>
                            </tr>
                            <tr>
                                <th scope="row">[Alcantarillado] Consumo residencial superior a básico</th>
                                <td>0.58m3</td>
                                <td>$1686.44</td>
                                <td>$974.27</td>
                            </tr>
                            <tr>
                                <th scope="row">[Alcantarillado] Consumo residencial superior a básico</th>
                                <td>1.81m3</td>
                                <td>$2810.74</td>
                                <td>$5092.79</td>
                            </tr>
                            <tr>
                                <th scope="row">Total aseo</th>
                                <td>-</td>
                                <td>-</td>
                                <td>$0</td>
                            </tr>
                            <tr>
                                <th scope="row">Descuentos</th>
                                <td>-</td>
                                <td>-</td>
                                <td>$1377.3</td>
                            </tr>
                            <tr id="total">
                                <th scope="row">Valor a pagar</th>
                                <td>-</td>
                                <td>-</td>
                                <td>$11779</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}
export default AptosDetailTable