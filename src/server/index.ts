import {
  onOpen,
  openDialog,
  openDialogBootstrap,
  openDialogMUI,
  openDialogTailwindCSS,
  openAboutSidebar,
} from './ui';

import {
  getSheetsData,
  addSheet,
  deleteSheet,
  setActiveSheet,
  setActiveSheetCell,
  setCellContent,
} from './sheets';

import {
  setSalesSheetMetaData,
  highlightSalesCells
} from './sales';

// Public functions must be exported as named exports
export {
  onOpen,
  openDialog,
  openDialogBootstrap,
  openDialogMUI,
  openDialogTailwindCSS,
  openAboutSidebar,
  getSheetsData,
  addSheet,
  deleteSheet,
  setActiveSheet,
  setActiveSheetCell,
  setSalesSheetMetaData,
  highlightSalesCells,
  setCellContent,
};
