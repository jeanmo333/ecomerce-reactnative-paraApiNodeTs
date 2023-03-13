/** @format */

import React, { useState, useEffect } from "react";
import { size } from "lodash";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/Search";
import ProductList from "../../components/Product/ProductList";
import ScreenLoading from "../../components/ScreenLoading";
import ResultNotFound from "../../components/Search/ResultNotFound";
import { searchProductsApi } from "../../api/Product";
import { API_URL } from "../../utils/constants";
import colors from "../../styles/colors";
import axiosClient from "../../config/axios";
import axios from "axios";
import Toast from "react-native-root-toast";

export default function SearchScreen(props) {
  const { route } = props;
  const { params } = route;
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      setProducts(null);
      try {
        const { data } = await axiosClient(
          `${API_URL}/api/search/${params.search}`
        );
        setProducts(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setLoading(false);
          if (axios.isAxiosError(error)) {
            Toast.show(error.response?.data.msg, {
              position: Toast.positions.CENTER,
            });
          }
        }
      }
      // const response = await searchProductsApi(params.search);
      // console.log(response);
      //setProducts(response.results);
    })();
  }, [params.search]);

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle='light-content' />
      <Search currentSearch={params.search} />
      {!products ? (
        <ScreenLoading text='Buscando productos' />
      ) : size(products) === 0 ? (
        <ResultNotFound search={params.search} />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}
