/** @format */

import React, { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import StatusBar from "../../components/StatusBar";
import ScreenLoading from "../../components/ScreenLoading";
import UserInfo from "../../components/Account/UserInfo";
import Menu from "../../components/Account/Menu";
import Search from "../../components/Search";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";
import axiosClient from "../../config/axios";
import { removeTokenApi } from "../../api/token";
import Toast from "react-native-root-toast";

export default function Account() {
  const [user, setUser] = useState(null);
  const { auth, logout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        // const response = await getMeApi(auth.token);
        // setUser(response);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        };
        try {
          const { data } = await axiosClient("/users/profile", config);
          setUser(data);
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
      {!user ? (
        <ScreenLoading size='large' />
      ) : (
        <>
          <Search />
          <ScrollView>
            <UserInfo user={user} />

            <Menu />
          </ScrollView>
        </>
      )}
    </>
  );
}
