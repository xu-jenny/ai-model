const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName,
    };
  });
};

export const addSheet = (sheetTitle) => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = (sheetIndex) => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = (sheetName) => {
  SpreadsheetApp.getActive().getSheetByName(sheetName).activate();
  return getSheetsData();
};

export const getActiveSheetCell = (cell) => {
  return SpreadsheetApp.getActive().getRange(cell);
};

function setSalesSheetMetaData(values) {
  const cell_map = {
    model_start_date: 'F12',
    sales_success_discount: 'D9',
    churn: 'E43',
  };
  Object.keys(values).forEach((key) => {
    console.log(key)
    console.log(cell_map[key])
    console.log(values[key])
    setCellContent(cell_map[key], values[key])
  });
}
class Cell {
  row: number;
  col: number;

  constructor(cell: string);
  constructor(row: number, col: number);
  constructor(arg1: string | number, arg2?: number) {
    if (typeof arg1 === 'string') {
      const [letters, numbers] = arg1.match(/^([a-zA-Z]+)(\d+)$/).slice(1);
      this.col = this.getColumnNumber(letters);
      this.row = parseInt(numbers);
    } else {
      this.row = arg1;
      this.col = arg2!;
    }
  }

  getColumnNumber(column) {
    let result = 0;
    for (let i = 0; i < column.length; i++) {
      const charCode = column.charCodeAt(i) - 64; // A is 65 in ASCII, so subtract 64 to get 1 for A, 2 for B, etc.
      result = result * 26 + charCode;
    }
    return result;
  }

  getColumnLetters() {
    let letters = '';
    while (this.col > 0) {
      const modulo = (this.col - 1) % 26;
      letters = String.fromCharCode(65 + modulo) + letters;
      this.col = Math.floor((this.col - 1) / 26);
    }
    return letters;
  }

  rowOffSet(by: number) {
    return this.row + by;
  }

  toString() {
    return this.getColumnLetters() + this.row.toString();
  }
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

function setPricePerUser(values){
  const cell_map = {
    'ad_spend': 'C4',
    'cpi': 'C7',
    'orangic_installs': 'C8',
    'install_member_converstion': 'C13',
    'churn_rate': 'C22',
    'price_per_user': 'C25'
  }
  Object.keys(values).forEach((key) => {
    console.log(key)
    console.log(cell_map[key])
    console.log(values[key])
    setCellContent(cell_map[key], values[key])
  });
}

function setCashflow(values){
  const cell_map = {
    'begin_cash': 'D6',
    'one_off_revenue': 'D15',
    'professional_services': 'D16',
    'revenue_growth_rate': 'D17',
    'cogs_software': 'D23',
    'oe_sales_marketing': 'D31',
    'oe_fees': 'D32',
    'oe_travel': 'D33',
    'oe_rent': 'D34',
    'oe_interest': 'D35',
    'oe_rd': 'D36',
    'oe_other': 'D38',
  }
  Object.keys(values).forEach((key) => {
    console.log(key)
    console.log(cell_map[key])
    console.log(values[key])
    setCellContent(cell_map[key], values[key])
  });
}

export const setActiveSheetCell = () => {
  SpreadsheetApp.getActive().getSheetByName('another').activate();
  SpreadsheetApp.getActive()
    .getSheetByName('another')
    .getRange('A2')
    .setValue('Hello!');
  const ss = SpreadsheetApp.getActive().getSheetByName('another');
  ss.getRange('A1').setValue('Hanother one!');
  
  SpreadsheetApp.getActive().getSheetByName('sales').activate();  
  const sales_hire_table = [
    ['90000', '4/21'],
    ['92000', '5/21'],
    ['94000', '6/21'],
  ];
  setSalesSheetMetaData({
    model_start_date: '02/31/2021',
    sales_success_discount: '0.75',
    churn: '0.06',
  });
  setSalesHire(sales_hire_table);

  SpreadsheetApp.getActive().getSheetByName('user_growth').activate();  
  const price_per_user_table = {
    'ad_spend': '1200',
    'cpi': '36',
    'orangic_installs': '100',
    'install_member_converstion': '0.2',
    'churn_rate': '0.4',
    'price_per_user': '0.2'
  }

  SpreadsheetApp.getActive().getSheetByName('cash_flow').activate();  
  const cashflow_table = {
    'begin_cash': '25000',
    'one_off_revenue': '20000',
    'professional_services': '1800',
    'revenue_growth_rate': '0.09',
    'cogs_software': '3000',
    'oe_sales_marketing': '1000',
    'oe_fees': '1000',
    'oe_travel': '795',
    'oe_rent': '4500',
    'oe_interest': '400',
    'oe_rd': '10000',
    'oe_other': '890',
  }

  setPricePerUser(price_per_user_table);
  setCashflow(cashflow_table);
  return getSheetsData();
};

export function getSheetOwnerEmail() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // @ts-ignore
  return sheet.getOwner().getEmail();
}

export function setCellContent(cell: string, content: string) {
  SpreadsheetApp.getActive().getRange(cell).setValue(content);
  return getSheetsData();
}
