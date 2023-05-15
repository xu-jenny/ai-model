// <Stage_1_info> Type of business: B2B SaaS Startup Model purpose: Fundraising for Seed Round Start date: Jan 2023 <End>

import { serverFunctions } from "../utils/serverFunctions";
import * as cheerio from 'cheerio';

// <Stage_2_info> Number of sales staff: 2 When is staff hired: Next month and 2 months from now Sales quota: $100,000 Contract payout: Annually SaaS Churn rate: 5% <End>
export function processMessage(message: string) {
    if(extractStageInfo(message, 2) != null){
        let info = extractStageInfo(message, 2)
        return [2, extractStage2Info(info)]
    }
    return null;
}

function extractStage2Info(info: string){
    console.log(info)
    const table = JSON.parse(info)
    return table
}

function extractStageInfo(longText: string, stage: number): string | null {
    console.log(longText)
    const stageTag = `<stage_${stage}_summary>`;
    const endTag = `<end>`;
    const pattern = new RegExp(`${stageTag}(.*?)${endTag}`, 's');
    const matchResult = longText.match(pattern);
    return matchResult ? matchResult[1] : null;
}
