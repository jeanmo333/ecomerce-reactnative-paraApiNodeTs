/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { size } from "lodash";
import axiosClient from "../config/axios";
import { SEARCH_HISTORY, API_URL } from "../utils/constants";
import { sortArrayByDate } from "../utils/functions";

export async function getSearchHistory() {
  //await AsyncStorage.removeItem(SEARCH_HISTORY);
  try {
    const history = await AsyncStorage.getItem(SEARCH_HISTORY);
    if (!history) return [];
    return sortArrayByDate(JSON.parse(history));
  } catch (e) {
    return [];
  }
}

export async function updateSearchHistoryApi(search) {
  const history = await getSearchHistory();

  if (size(history) > 7) history.pop();

  history.push({
    search,
    date: new Date(),
  });
  await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
}

export async function searchProductsApi(search) {
  try {
    const { data } = await axiosClient(`/search/${search}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
  // try {
  //   // http://localhost:4000/api/search/products/iphone
  //   //http://localhost:4000/api/search/iphone
  //   const url = `${API_URL}/api/search/${search}`;
  //   const response = await fetch(url);
  //   const result = await response.json();
  //   return result;
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }
}

export async function getMeApi(token) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axiosClient("/users/profile", config);
    return data;
  } catch (error) {
    removeTokenApi();
    console.log(error);
  }
}
