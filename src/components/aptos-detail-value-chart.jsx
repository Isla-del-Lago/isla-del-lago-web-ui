import React from "react";
import Chart from "react-google-charts";
import './styles/aptos-detail.css'

class AptosDetailValueChart extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/* <div className="col-12 col-md-6" id="chartContainer"> */}
                <div className='chartContainer'>
                    <Chart
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Month', 'Costo en COP'],
                            ['03/03/2020 - 30/04/2020', 25000],
                            ['01/05/2020 - 30/06/2020', 32000],
                            ['01/07/2020 - 28/08/2020', 20000],
                            ['29/08/2020 - 27/10/2020', 27000],
                            ['28/10/2020 - 26/12/2020', 22000],
                        ]}
                        options={{
                            curveType: 'function',
                            lineWidth: 4,
                            intervals: { style: 'line' },
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
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
                {/* </div> */}
            </React.Fragment>

        )
    }
}
export default AptosDetailValueChart