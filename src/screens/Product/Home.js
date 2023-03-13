/** @format */

import { View, Text, StyleSheet } from "react-native";
import React, { useState, useCallback } from "react";

import axios from "axios";
import Toast from "react-native-root-toast";
import { useFocusEffect } from "@react-navigation/native";

import { ScrollView } from "react-native";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/Search";
import Banners from "../../components/Home/Banners";
import NewProducts from "../../components/Home/NewProducts";
import colors from "../../styles/colors";
import useAuth from "../../hooks/useAuth";
import axiosClient from "../../config/axios";

export default function Home() {
  const { auth, logout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        };
        try {
          await axiosClient("/users/profile", config);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            logout();
            Toast.show("Vuelve a ingresar porfavor", {
              position: Toast.positions.CENTER,
            });
            console.log(error.response?.data.msg);
          }
        }
      })();
    }, [])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle='light-content' />
      <Search />
      <ScrollView>
        <Banners />
        <NewProducts />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
