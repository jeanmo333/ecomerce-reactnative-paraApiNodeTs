/** @format */

import axios from "axios";
import axiosClient from "../config/axios";
import { API_URL } from "../utils/constants";

//function for user register
export async function registerApi(formData) {
  try {
    const url = `${API_URL}/api/users/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//function for login
export async function loginApi(formData) {
  try {
    const url = `${API_URL}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return {
      error: "servidor no responde",
    };
  }
}

//http://localhost:4000/api/users/profile

//obtener el usuario
// export const getMeApi = async (token) => {
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

// //obtener el usuario
// export async function getMeApi(token) {
//   try {
//     const url = `${API_URL}/users/me`;
//     const params = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token} `,
//       },
//     };
//     const response = await fetch(url, params);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

//editar el usuario
export async function updateUserApi(auth, formData) {
  try {
    const url = `${API_URL}/api/users/profile/${auth.idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token} `,
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return result;
  }
}
