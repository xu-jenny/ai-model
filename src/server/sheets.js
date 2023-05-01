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

export const setActiveSheetCell = () => {
  SpreadsheetApp.getActive().getSheetByName('another').activate();
  SpreadsheetApp.getActive()
    .getSheetByName('another')
    .getRange('A2')
    .setValue('Hello!');
  const ss = SpreadsheetApp.getActive().getSheetByName('another');
  ss.getRange('A1').setValue('Hello Worlds!');
  return getSheetsData();
};

export function getSheetOwnerEmail() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  return sheet.getOwner().getEmail();
}
