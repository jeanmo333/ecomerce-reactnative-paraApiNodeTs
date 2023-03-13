/** @format */

import axios from "axios";
import { BASE_URL_DEV, BASE_URL_PRODUCTION } from "@env";
const axiosClient = axios.create({
  baseURL: BASE_URL_PRODUCTION,
});

export default axiosClient;
