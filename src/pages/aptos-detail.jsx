import React from 'react'
import AptosDetailTable from '../components/aptos-detail-details-table'
import AptosDetailConsumptionChart from '../components/aptos-detail-consumption-chart'
import AptosDetailValueChart from '../components/aptos-detail-value-chart'

class AptosDetail extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <AptosDetailTable />
                    <div className="col-12 col-lg-6">
                    <AptosDetailConsumptionChart />
                    <AptosDetailValueChart />
                    </div>
                </div>
            </div>
        )
    }
}
export default AptosDetail