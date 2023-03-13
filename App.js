/** @format */

import React, { useState, useMemo, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import jwtDecode from "jwt-decode";

import AppNavigation from "./src/navigation/AppNavigation";
import AuthScreen from "./src/screens/AuthScreen";
import AuthContext from "./src/context/AuthContext";
import { setTokenApi, getTokenApi, removeTokenApi } from "./src/api/token";
import { deleteCartApi } from "./src/api/Cart";

export default function App() {
  const [auth, setAuth] = useState(undefined);
  //cargar el usuario authenticado
  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  //login interno para authenticar el usuario
  const login = (data) => {
    setTokenApi(data.token);
    setAuth({
      token: data.token,
      idUser: data.user._id,
    });
  };

  //cerrar secion
  const logout = () => {
    if (auth) {
      removeTokenApi();
      deleteCartApi();
      setAuth(null);
    }
  };

  //comprobar si cambia los datos
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  // console.log(auth);

  //si el usuario esta authenticado muestra zona usuario si no muestra AuthScreen
  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>{auth ? <AppNavigation /> : <AuthScreen />}</PaperProvider>
    </AuthContext.Provider>
  );
}
