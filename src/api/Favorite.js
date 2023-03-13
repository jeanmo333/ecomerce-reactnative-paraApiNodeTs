/** @format */

import { size } from "lodash";
import { API_URL } from "../utils/constants";

export async function addFavoriteApi(auth, product) {
  try {
    const url = `${API_URL}/api/favorites/${product._id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(product),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isFavoriteApi(auth, idProduct) {
  try {
    // http://localhost:4000/api/favorites/product/64076d7e7cda7358e8c22988
    const url = `${API_URL}/api/favorites/product/${idProduct}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteFavoriteApi(auth, id) {
  try {
    const dataFound = await isFavoriteApi(auth, id);
    if (size(dataFound) > 0) {
      const url = `${API_URL}/api/favorites/${id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(auth) {
  try {
    // const url = `${API_URL}/api/favorites?user=${auth.idUser}`;
    const url = `${API_URL}/api/favorites`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}
