import { highlightCells, setCellContent } from './sheets';
import { Company } from '../client/sidebar-about-page/components/Company';

const SHEET_NAME = 'user_growth';
const CELL_MAP = {
  ad_spend: 'C4',
  cost_per_install: 'C7',
  organic_installs: 'C8',
  install_member_converstion: 'C13',
  churn_rate: 'C22',
  monthly_price_per_user: 'C25',
};

export function setPricePerUser(data: { [key: string]: string }) {
  SpreadsheetApp.getActive().getSheetByName(SHEET_NAME).activate();
  Object.keys(CELL_MAP).forEach((key) => {
    console.log(key, key in data);
    if (key in data) {
      setCellContent(CELL_MAP[key], data[key]);
    }
  });
}
