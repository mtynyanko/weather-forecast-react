import { useState } from "react"
import styled from "styled-components"

import { getForecast } from "../api/apiForecast";
import { getLocation } from "../api/apiGeo";

import Chart, { IForecastItem } from "./Chart";

interface IData {
  country: string;
  lat: number;
  lon: number;
  state: string;
  name: string;
  status: number;
}

interface IResponse {
  data: [IData];
}

const LineDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 15px;
  width: 200px;
  height: 45px;
  box-sizing: border-box;
  border-radius: 10px 0px 0px 10px;
  font-size: 1.2rem;
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid black;
  &::placeholder {
    color: #a9a9a9
  }
  &:focus {
    outline: none;
    border: 1px solid rgb(43, 156, 230);
  }
`;
const StartForecastButton = styled.button`
  display: flex;
  align-items: center;
  padding: 15px;
  height: 45px;
  box-sizing: border-box;  
  border-radius: 0px 10px 10px 0px;
  border: 1px solid rgb(43, 156, 230);
  background:rgb(43, 156, 230);
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  font-size: 1.1rem;
  transition: all 500ms ease; 
  &:hover {
    background: rgba(0,0,0,0);
	  color: rgb(43, 156, 230);
	  box-shadow: inset 0 0 0 3px rgb(43, 156, 230);
  }
  &:active {
    background-color: #cccccc;
  }
`;


const SearchTab = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [forecastData, setForecastData] = useState<IForecastItem[]>([]);

  

  const startForecast = async (city: string) => {
    try {
      if (inputValue.trim()) {
        const response: IResponse = await getLocation(city)

        if (Number(response.data.length) === 0) {
          throw new Error('нет такого города')
        } 
        const [lat, lon] = [response.data[0].lat, response.data[0].lon];
        const forecast = await getForecast(lat.toString(), lon.toString());
        setForecastData([...forecast.data.list]);
        console.log(forecast.data.list);
      } 
    } catch (error) {
      if (error instanceof Error) {
        setForecastData([]);
        console.log(error.message);
        return;
      }
    }
   


  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // const handleClick = () => {
    
    
  // }

  return (<>
    <LineDiv>
      <SearchInput type="text" placeholder="введите город" value={inputValue} onChange={handleChange}/>
      <StartForecastButton onClick={() => startForecast(inputValue)}>
        Показать прогноз погоды
      </StartForecastButton>
    </LineDiv>
   <Chart forecast={forecastData} />
    </>)
}
export default SearchTab