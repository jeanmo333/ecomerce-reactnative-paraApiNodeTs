/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { size } from "lodash";
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
    const url = `${API_URL}/products?_q=${search}&_limit=40`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
