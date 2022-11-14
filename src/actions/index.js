import catApi from "../apis/catApi";
import {ADD_IMAGES, FETCH_CATEGORIES, FETCH_IMAGES, SET_CATEGORY} from "./types";

export const fetchCategories = async () => {
  const request = await catApi.get('/categories');

  return({type: FETCH_CATEGORIES, payload: request.data});
};

export const fetchImages = async (categoryId) => {
  const request = await catApi.get(`images/search?limit=10&page=1&category_ids=${categoryId}`);

  return({type: FETCH_IMAGES, payload: request.data});
}

export const addImages = async (categoryId) => {
  const request = await catApi.get(`images/search?limit=10&page=1&category_ids=${categoryId}`);

  return({type: ADD_IMAGES, payload: request.data});
}

export const setCategory = (id) => {
  return ({type: SET_CATEGORY, payload: id});
}