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

 /**
  * 
  * @param ranges arg to sheet.getRange(), such as "A1, C3, B2"
  */
export function highlightCells(ranges: string[]) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let rangeList = sheet.getRangeList(ranges);
  sheet.setActiveRangeList(rangeList);
}

