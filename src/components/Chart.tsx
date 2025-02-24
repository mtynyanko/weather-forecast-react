import { AreaChart, Area } from "recharts"

interface IWind {
  speed: number;
  deg: number;
  gust: number;
}

interface IMain {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IForecastItem {
  dt: number;
  dt_txt: string;
  main: IMain;
  pop: number;
  visibility: number;
  weather: [IWeather];
  wind: IWind;
}

interface ChartProps {
  forecast: IForecastItem[];
}

const Chart = ({ forecast }: ChartProps) => {

  const temp = forecast.map(elem => ({
    temp: elem.main.temp,
    time: new Date(elem.dt * 1000).toLocaleTimeString()
  }))
  
  return (
    <AreaChart width={500} height={400} data={temp}>
      <Area dataKey="temp" />
    </AreaChart>
  )
}
export default Chart