/** @format */

import { API_URL } from "../utils/constants";

export async function getOrdersApi(auth) {
  try {
    //const url = `${API_URL}/api/orders?user=${auth.idUser}`;
    const url = `${API_URL}/api/orders`;
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
