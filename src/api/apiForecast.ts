import { AxiosResponse } from "axios";

import api from "./api";

interface IGetForecast {
  (lat: string, lon: string): Promise<AxiosResponse>
}

export const getForecast: IGetForecast = (lat, lon) => {
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lon', lon);
  params.append('appid', import.meta.env.KEY)
  return api.get("data/2.5/forecast")
}