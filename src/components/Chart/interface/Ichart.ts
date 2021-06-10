interface IChartData {
  labels: string[];
  datasets: {
    label: string;
    data: string[] | number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

export default interface IChart {
  title?: string;
  type: string;
  data: IChartData;
  height: number;
}
