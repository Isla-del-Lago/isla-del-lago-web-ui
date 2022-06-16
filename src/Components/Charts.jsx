import React from 'react';
import ConsumptionChart from './ConsumptionChart';
import CostChart from './CostChart';
export default function Charts(props) {
    const { dates, costs, consumptions } = props;
    return (
        <React.Fragment>
            <div className='chartsContainer'>
                <ConsumptionChart dates={dates} consumptions={consumptions} />
                <CostChart dates={dates} costs={costs} />
            </div>
        </React.Fragment>
    );
}
