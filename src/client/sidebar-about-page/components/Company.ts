import moment from 'moment';

type RevenueModel =
  | 'saas_subscription'
  | 'price_per_user'
  | 'professional_services'
  | 'other';
export class Company {
  name: string = '';
  product_name: string = '';
  revenue_model: RevenueModel = 'other';
  model_start_date: Date = new Date();
  sales_hiring_plan = [[]];
  churn_rate = 0.05;
  sales_success_rate: number = 0.9;
  monthly_user_acquisition_spend = 0;
  ad_spend_per_install = 0;
  organic_installs = 0;
  monthly_price_per_user = 0;
  growth_rate = 0;
  non_sales_hire_plan = [[]];
  operating_expense = 0;
  non_operating_expense = 0;
  current_cash = 0;
  expected_investments = [[]];

  processBasic(data: {
    business_name: string;
    product_name: string;
    model_purpose: string;
    start_date: string;
    revenue_model: string;
  }) {
    this.name = data['business_name'] || this.name;
    this.product_name = data['product_name'] || this.product_name;
    this.model_start_date =
      moment(data['start_date']).toDate() || this.model_start_date;
    try {
      this.revenue_model =
        (data['revenue_model'] as RevenueModel) || this.revenue_model;
    } catch (error) {
      console.log('error casting data.revenue_model', data['revenue_model']);
      console.error(error);
    }
  }

  processSales(data) {
    this.sales_hiring_plan =
      data['sales_hiring_plan'] || this.sales_hiring_plan;
    this.churn_rate = data['churn_rate'] || this.churn_rate;
    this.sales_success_rate =
      data['sales_success_rate'] || this.sales_success_rate;
  }

  getSalesMetaData() {
    return {
      model_start_date: moment(this.model_start_date).format('MM-DD-YYYY'),
      sales_success_rate: this.sales_success_rate,
      churn_rate: this.churn_rate,
    };
  }

  processPricePerUser(data) {
    this.monthly_user_acquisition_spend =
      data['monthly_user_acquisition_spend'] ||
      this.monthly_user_acquisition_spend;
    this.ad_spend_per_install =
      data['ad_spend_per_install'] || this.ad_spend_per_install;
    this.monthly_price_per_user =
      data['monthly_price_per_user'] || this.monthly_price_per_user;
    this.growth_rate = data['growth_rate'] || this.growth_rate;
    this.churn_rate = data['churn_rate'] || this.churn_rate;
    this.organic_installs = data['organic_installs'] || this.organic_installs;
  }

  getPricePerUserData() {
    return {
      ad_spend: this.monthly_user_acquisition_spend,
      cost_per_install: this.ad_spend_per_install,
      monthly_price_per_user: this.monthly_price_per_user,
      growth_rate: this.growth_rate,
      churn_rate: this.churn_rate,
      organic_installs: this.organic_installs,
    };
  }

  processExpenses(data) {
    this.non_sales_hire_plan =
      data['future_hires'] || data['hire_plan'] || this.non_sales_hire_plan;
    this.operating_expense =
      data['operating_expense'] ||
      data['monthly_operating_expense'] ||
      this.operating_expense;
    this.non_operating_expense =
      data['non_operating_expense'] ||
      data['monthly_non_operating_expense'] ||
      this.non_operating_expense;
  }

  getExpenses() {
    return {
      total_operating_expense: this.operating_expense,
      begin_cash: this.current_cash,
      total_non_operating_expense: this.non_operating_expense,
      hire_plan: this.non_sales_hire_plan,
    };
  }

  processCash(data) {
    this.current_cash = data['current_cash'] || this.current_cash;
    this.expected_investments =
      data['expected_investments'] || this.expected_investments;
  }

  getIncome() {
    return {
      current_cash: this.current_cash,
      expected_investments: this.expected_investments,
    };
  }
}
