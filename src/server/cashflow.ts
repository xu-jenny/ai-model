import { setCellContent } from './sheets';
import { Company } from '../client/sidebar-about-page/components/Company';
import moment from 'moment';

const SHEET_NAME = 'cash_flow';
const CELL_MAP = {
  begin_cash: 'D6',
  one_off_revenue: 'D15',
  professional_services: 'D16',
  revenue_growth_rate: 'D17',
  cogs_software: 'D23',
  oe_sales_marketing: 'D31',
  oe_fees: 'D32',
  oe_travel: 'D33',
  oe_rent: 'D34',
  oe_interest: 'D35',
  oe_rd: 'D36',
  oe_other: 'D38',
  total_operating_expense: 'D39',
  // 'total_non_operating_expense': 'D40',
};

export function setExpenses(data) {
  // SpreadsheetApp.getActive().getSheetByName(SHEET_NAME).activate();
  // Object.keys(CELL_MAP).forEach((key) => {
  //   if (key in data) {
  //     setCellContent(CELL_MAP[key], data[key]);
  //   }
  // });
  fillHirePlan(data.hire_plan);
}

function fillHirePlan(hires) {
  // const START_CELL = new Cell('A2');
  SpreadsheetApp.getActive().getSheetByName('payroll').activate();
  const sheet = SpreadsheetApp.getActive().getSheetByName('payroll');
  console.log(sheet);
  hires.forEach((hire, index) => {
    // console.log(START_CELL.getOffsetRowCell(i).toString(), hire[0]);
    // setCellContent(START_CELL.getOffsetRowCell(i).toString(), hire[0]);
    // setCellContent(START_CELL.getOffsetCell(i, 1).toString(), hire[1]);
    console.log(hire);
    const newRow = 2 + index;
    setCellContent(`A${newRow}`, hire['role']);
    setCellContent(`B${newRow}`, hire['salary']);

    // find date in row
    const searchDate = moment(hire['hire_date']).toDate();
    var range = sheet.getRange('D1:AY1');
    var values = range.getValues()[0]; // Assuming the dates are in the first row
    for (var i = 0; i < values.length; i++) {
      var cellValue = values[i];
      if (cellValue instanceof Date && moment(cellValue).isSame(searchDate)) {
        var columnLetter = String.fromCharCode(65 + i); // Convert index to column letter (A, B, C, ...)
        console.log(columnLetter);
        setCellContent(`${columnLetter}${i + 1}`, '1'); // todo: travese array for same title on same date
      }
    }
  });
}

export function setIncome(data) {
  setCellContent('D6', data.current_cash.toString());
  fillInvestments(data.expected_investments);
}

function fillInvestments(investments: string[][]) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  sheet.activate();
  investments.forEach((investment, i) => {
    // find date in row
    const searchDate = moment(investment[1]).toDate();
    var range = sheet.getRange('D5:AY1');
    var values = range.getValues()[0]; // Assuming the dates are in the first row
    for (var i = 0; i < values.length; i++) {
      var cellValue = values[i];
      if (cellValue instanceof Date && moment(cellValue).isSame(searchDate)) {
        var columnLetter = String.fromCharCode(65 + i); // Convert index to column letter (A, B, C, ...)
        setCellContent(`${columnLetter}7`, investment[0]);
      }
    }
  });
}
