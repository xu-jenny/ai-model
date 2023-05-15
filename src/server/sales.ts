import { highlightCells, setCellContent } from "./sheets";
import moment from 'moment';
import { Company } from "../client/sidebar-about-page/components/Company";

const CELL_MAP = {
    'model_start_date': 'F12',
    'sales_success_rate': 'D9',
    'churn_rate': 'F43',
    'hire_quota_start': 'A18',
    'hire_date_start': 'E18'
}

export function setSalesSheetMetaData(data) {
    console.log(data)
    SpreadsheetApp.getActive().getSheetByName('sales').activate();
    const cells = {
        model_start_date: data['model_start_date'],
        sales_success_rate: data.sales_success_rate,
        churn_rate: data.churn_rate,
    };
    console.log(cells)
    Object.keys(cells).forEach((key) => {
        console.log(key)
        console.log(CELL_MAP[key])
        setCellContent(CELL_MAP[key], cells[key])
    });
}

function setSalesHire(table) {
    const SalesQuotaCell = new Cell('A18');
    const SalesHireCell = new Cell('E18');
    table.forEach((tuple, i) => {
        console.log(new Cell(SalesQuotaCell.rowOffSet(i), SalesQuotaCell.col).toString())
        setCellContent(
            new Cell(SalesQuotaCell.rowOffSet(i), SalesQuotaCell.col).toString(),
            tuple[0]
        );

        setCellContent(
            new Cell(SalesHireCell.rowOffSet(i), SalesHireCell.col).toString(),
            tuple[1]
        );
    });
}

export function highlightSalesCells(vocab) {
    // let ranges = [CELL_MAP['sales_success_rate'], CELL_MAP['model_start_date'], CELL_MAP['churn_rate']]
    // console.log(ranges)
    // SpreadsheetApp.getActive().getSheetByName('sales').activate();
    // const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    // let rangeList = sheet.getRangeList(ranges);
    // sheet.setActiveRangeList(rangeList);
    switch (vocab) {
        case 'metadata':
            highlightCells([CELL_MAP['sales_success_rate'], CELL_MAP['model_start_date'], CELL_MAP['churn_rate']])
            break;
        case 'hire':
            highlightCells([CELL_MAP['hire_date_start'], CELL_MAP['hire_quota_start']])
            break;
        case 'hire_explain':
            highlightCells(['B18'])
            break;
    }
}
