import React from "react";
import Chart from "react-google-charts";
import './styles/aptos-detail.css'

class AptosDetailConsumptionChart extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/* <div className="col-12 col-md-6" id="chartContainer"> */}
                <div className='chartContainer'>
                    <Chart
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Month', 'Consumo en m3'],
                            ['03/03/2020 - 30/04/2020', 2.74],
                            ['01/05/2020 - 30/06/2020', 4.24],
                            ['01/07/2020 - 28/08/2020', 1.81],
                            ['29/08/2020 - 27/10/2020', 3.01],
                            ['28/10/2020 - 26/12/2020', 1.71],
                        ]}
                        options={{

                            width: '100%',
                            height: '300',
                            colors: ['#3ab2e0'],
                            bar: {
                                groupWidth: "50%",
                                color: 'red',
                            },
                            legend: {
                                position: 'top',
                                alignment: 'center'
                            },
                            // title: '',
                            chartArea: { width: '80%', height: '80%' },
                            hAxis: {
                                textStyle: {
                                    fontSize: 10,
                                    color: '#000',
                                    bold: true,
                                    italic: true,
                                    auraColor: '#fff',
                                },
                                textPosition: 'out',
                            },
                            vAxis: {
                            },
                        }
                        }
                        legendToggle
                    />
                </div>
                {/* </div> */}
            </React.Fragment>

        )
    }
}
export default AptosDetailConsumptionChart