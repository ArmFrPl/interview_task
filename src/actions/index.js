import weatherApi from "../apis/weatherApi";
import { API_KEY } from "../Consts";
import {GET_CURRENT, GET_DAILY, GET_CITY, GET_BY_LOCATION_CURRENT, GET_BY_LOCATION_DAILY} from "./types";

export const getByLocationCurrent = async (lat, lon) => {
  const request = await weatherApi.get(`/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);

  return({type: GET_BY_LOCATION_CURRENT, payload: request.data});
};
export const getByLocationDaily = async (lat, lon) => {
  const request = await weatherApi.get(`/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);

  return({type: GET_BY_LOCATION_DAILY, payload: request.data});
};
export const getCurrent = async (city) => {
  const request = await weatherApi.get(`/weather?q=${city}&units=metric&appid=${API_KEY}`);

  return({type: GET_CURRENT, payload: request.data});
};
export const getDaily = async (city) => {
  const request = await weatherApi.get(`/forecast?q=${city}&units=metric&appid=${API_KEY}`);

  return({type: GET_DAILY, payload: request.data});
};
export const getCity = async (city) => {
  return({type: GET_CITY, payload: city});
};