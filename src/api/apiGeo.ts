import { AxiosResponse } from "axios";

import api from "./api";

interface IGetLocation {
  (city: string): Promise<AxiosResponse>
}

export const getLocation: IGetLocation = (city) => {
  const params = new URLSearchParams();
  params.append('q', city);
  params.append('limit', '1');
  params.append('appid', import.meta.env.VITE_KEY)
  return api.get("geo/1.0/direct?"+params.toString())
}