import { IAirPolution, IWeatherResponse } from './temperatureType';

export interface IGetListCityParams {
  searchName: string;
  limit: number;
}

export interface ICityResponse {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
  temperature?: IWeatherResponse;
  airQuality?: IAirPolution;
}
