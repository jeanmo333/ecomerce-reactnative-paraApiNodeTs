/** @format */

import React from "react";
import { Alert, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

export default function Menu() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const logoutAccount = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estas seguro de que quieres salir de tu cuenta?",
      [
        {
          text: "NO",
        },
        { text: "SI", onPress: logout },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <List.Section>
        <List.Subheader>App</List.Subheader>
        <List.Item
          title='Mis compras'
          description='Listado de todos los compras'
          left={(props) => <List.Icon {...props} icon='clipboard-list' />}
          onPress={() => navigation.navigate("orders")}
        />
        <List.Item
          title='Lista de deseos'
          description='Listado de todos los productos que te quieres comprar'
          left={(props) => <List.Icon {...props} icon='heart' />}
          onPress={() => navigation.navigate("favorites")}
        />
        <List.Item
          title='Cerrar sesión'
          description='Cierra esta sesion y inicia con otra'
          left={(props) => <List.Icon {...props} icon='logout' />}
          onPress={logoutAccount}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Mi cuenta</List.Subheader>

        <List.Item
          title='Mis direcciones'
          description='Administra tus direcciones de envio'
          left={(props) => <List.Icon {...props} icon='map' />}
          onPress={() => navigation.navigate("addresses")}
        />

        <List.Item
          title='Cambiar nombre y apellido'
          description='Cambia el nombre y apellido de tu cuenta'
          left={(props) => <List.Icon {...props} icon='sim' />}
          onPress={() => navigation.navigate("change-name")}
        />

        <List.Item
          title='Cambiar email'
          description='Cambia el email de tu cuenta'
          left={(props) => <List.Icon {...props} icon='at' />}
          onPress={() => {
            navigation.navigate("change-email");
          }}
        />

        <List.Item
          title='Cambiar web y telefono'
          description='Cambia la web y telefono de tu cuenta'
          left={(props) => <List.Icon {...props} icon='sim' />}
          onPress={() => navigation.navigate("change-web-tel")}
        />

        <List.Item
          style={styles.container}
          title='Cambiar contraseña'
          description='Cambia el contraseña de tu cuenta'
          left={(props) => <List.Icon {...props} icon='key' />}
          onPress={() => navigation.navigate("change-password")}
        />
      </List.Section>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
});
