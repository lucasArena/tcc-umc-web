export interface IPaymentsPerDay {
  day: string;
  total: number;
}

export interface IPaymentChart {
  labels: string[];
  data: number[] | string[];
}

export interface IPaymentFilter {
  date_filter: string;
}
