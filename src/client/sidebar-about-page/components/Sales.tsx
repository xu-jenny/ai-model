import { serverFunctions } from '../../utils/serverFunctions';
import React, { useContext, useEffect, useState } from 'react';
import { Company } from './Company';
import CompanyContext from './CompanyContext';

const OutlineButton = () => <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
    Button
</button>

const Sales = () => {
    const [stage, setStage] = useState<number>(0);
    const { company } = useContext(CompanyContext)

    useEffect(() => {
        console.log(stage)
        switch (stage) {
            case 0:
                serverFunctions.setSalesSheetMetaData(company)
                serverFunctions.highlightSalesCells('metadata')
                break;
            case 1:
                serverFunctions.highlightSalesCells('hire')
                break;
            default:
                serverFunctions.highlightSalesCells('hire_explain')
                break;
        }
    }, [stage])

    return <>
        <h3> Let's explore this Sales Sheet </h3>
        <br />
        <div className="flex-grow overflow-y-auto h-full">
            <p>Based on our conversation, we have just filled in these relevant sales data</p>
            <p>Sales Success Rate: the success rate of your sales team, which will impact the revenue</p>
            <p>Model start date: start date of your model</p>
            <p>Churn rate: churn rate of your model</p>
            {stage >= 1 && <>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <p>Here are the sales hires you expect</p>
            </>}
            {stage >= 2 && <>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <p>The actual amount we expect the salesman to make</p>
            </>}
            {stage >= 1 && <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setStage(stage - 1)}>Prev</button>}
            {stage < 2 && <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setStage(stage + 1)}>Next</button>}
            {/* {stage == 2 && <button onClick={done}>I understand this sheet</button>} */}
        </div>
    </>
}

export default Sales;