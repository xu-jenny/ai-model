import moment from "moment";

export class Company {
    name: string = "";
    products =  [];
    revenue_models = [];
    model_start_date: Date = new Date();
    sales_hiring_plan = [[]];
    churn_rate = 0.05;
    sales_success_rate: number =  0.9;

    processSales(data){
        this.sales_hiring_plan = data['sales_hiring_plan'] || this.sales_hiring_plan;
        this.churn_rate = data['churn_rate'] || this.churn_rate;
        this.sales_success_rate = data['sales_success_rate'] || this.sales_success_rate;
    }

    getSalesMetaData(){
        return {
            'model_start_date': moment(this.model_start_date).format('MM-DD-YYYY'),
            'sales_success_rate': this.sales_success_rate,
            'churn_rate': this.churn_rate
        }
    }
}