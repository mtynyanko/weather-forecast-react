import { 
  Area,
  AreaChart,
  CartesianGrid, 
  Line, 
  LineChart, 
  Tooltip, 
  TooltipProps, 
  XAxis, 
  YAxis 
  } from "recharts"
import styled from "styled-components";
import { useState } from "react";

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

const ChartsRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Arial", sans-serif;
  width: 500px;
  height: 400px;
  font-size: 0.8rem;
  padding-right: 50px;
  margin-top: 50px;
  
`;

const TabsLine = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 96.4%;
`;

const TabButton = styled.button<{ active?: boolean }>`
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
  width: 70%;
  border: 0px solid black;
  font-size: 0.95rem;
  height: 30px;
  background: ${({ active }) => (active ? "#2b9ce6" : "#ffffff")};
  color: ${({ active }) => (active ? "#ffffff" : "#000000")};
  transition: all 400ms ease; 
&:hover {
  background: #e5e5e5;
  color: black;
}
`;



const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  return (
    <div style={{ backgroundColor: "white", padding: "10px", border: "1px solid #ccc" }}>
      <p>{`${data.day}`}</p>
      <p>{`Температура: ${data.temperature}°C`}</p>
      <p>{`Ощущается как: ${data.feels_like}°C`}</p>
      <p>{`Описание: ${data.description}`}</p>
      <p>{`Ветер: ${data.wind} м/с, порыв: ${data.gust}`}</p>
    </div>
  );
};

const Chart = ({ forecast }: ChartProps) => {
  const [timeTabsValue, setTimeTabsValue] = useState(2);
  const [daysCount, setDaysCount] = useState(5);

  const [chartType, setChartType] = useState(1);
  const [chartTabsValue, setChartTabsValue] = useState(1);

  const temp = forecast.map(elem => ({
    temperature: elem.main.temp,
    feels_like: elem.main.temp,
    pressure: elem.main.pressure,
    humidity: elem.main.humidity,
    wind: elem.wind.speed,
    gust: elem.wind.gust,
    description: elem.weather[0].description,
    time: new Date(elem.dt * 1000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    day: new Date(elem.dt * 1000).toLocaleTimeString("ru-RU", { weekday: "short", day: "2-digit", month: "short" }),
    timestamp: elem.dt,
  }));

  

  const changeTimeTabs = (tabIndex: number, days: number) => {
    setTimeTabsValue(tabIndex);
    setDaysCount(days)
  }
  const changeChartTabs = (tabIndex: number, chartType: number) => {
    setChartType(chartType);
    setChartTabsValue(tabIndex);
  }

  
  return (
  <ChartsRoot>
    <ChartContainer>
      {chartType === 1 ? <LineChart data={temp.slice(0,8*daysCount)} width={500} height={400}>
      <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
        <XAxis dataKey="time" style={{fontSize: "0.6rem"}}/>
        <YAxis dataKey="temperature"/>
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 5 }} />
      </LineChart> : <></>}
      {chartType === 2 ? <AreaChart width={500} height={400} data={temp.slice(0,8*daysCount)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" style={{fontSize: "0.6rem"}}/>
        <YAxis dataKey="humidity"/>
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="humidity" stroke="#8884d8" fill="#8884d8" />
      </AreaChart> : <></>}
      {chartType === 3 ? <AreaChart width={500} height={400} data={temp.slice(0,8*daysCount)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" style={{fontSize: "0.6rem"}}/>
        <YAxis dataKey="pressure"/>
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="pressure" stroke="#8884d8" fill="#8884d8" />
      </AreaChart> : <></>}
      
    </ChartContainer>
    <TabsLine>
      <TabButton active={timeTabsValue === 1} onClick={() => changeTimeTabs(1, 1)}>на сутки</TabButton>
      <TabButton active={timeTabsValue === 2} onClick={() => changeTimeTabs(2, 5)}>на 5 дней</TabButton>
    </TabsLine>
    <TabsLine>
      <TabButton active={chartTabsValue === 1} onClick={() => changeChartTabs(1, 1)}>температура</TabButton>
      <TabButton active={chartTabsValue === 2} onClick={() => changeChartTabs(2, 2)}>влажность</TabButton>
      <TabButton active={chartTabsValue === 3} onClick={() => changeChartTabs(3, 3)}>давление</TabButton>
    </TabsLine>
  </ChartsRoot>)
}
export default Chart