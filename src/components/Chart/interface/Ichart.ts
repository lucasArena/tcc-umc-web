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

interface IChartOptions {
  maintainAspectRatio: boolean,
  scales: {
    y: {
      ticks: {
        callback: (value: any) => string;
      }
    }
  },
  plugins: {
    legend: {
      position: string;
    },
    title?: {
      display: boolean;
      text: string;
    },
  },
}

export default interface IChart {
  title?: string;
  type: string;
  data: IChartData;
  options?: IChartOptions,
  height: number;
}
