/** @format */

import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import useAuth from "../../hooks/useAuth";
import { deleteAddressApi } from "../../api/Address";
import colors from "../../styles/colors";

export default function AddressList(props) {
  const { addresses, setReloadAddress } = props;
  const navigation = useNavigation();
  const { auth } = useAuth();

  const goToUpdateAddress = (idAddress) => {
    navigation.navigate("add-address", { idAddress });
  };

  const deleteAddressAlert = (address) => {
    Alert.alert(
      "Eliminadr dirección",
      `¿Estas seguro de que quieres eliminar la dirección ${address.title}?`,
      [
        {
          text: "NO",
        },
        { text: "SI", onPress: () => deleteAddress(address._id) },
      ],
      { cancelable: false }
    );
  };

  const deleteAddress = async (idAddress) => {
    try {
      await deleteAddressApi(auth, idAddress);
      setReloadAddress(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {map(addresses, (address) => (
        <View key={address._id} style={styles.address}>
          <Text style={styles.title}>{address.title}</Text>
          <Divider style={styles.divider} />
          <Text>{address.name_lastname}</Text>
          <Text>{address.address}</Text>
          <View style={styles.blockLine}>
            <Text>{address.state}, </Text>
            <Text>{address.city}, </Text>
            <Text>{address.postal_code}</Text>
          </View>
          <Text>{address.country}</Text>
          <Text>Numero de telefono: {address.phone}</Text>
          <View style={styles.actions}>
            <Button
              mode='contained'
              style={styles.btnSuccess}
              onPress={() => goToUpdateAddress(address._id)}>
              Editar
            </Button>

            <Button
              mode='contained'
              style={styles.btnDanger}
              onPress={() => deleteAddressAlert(address)}>
              Eliminar
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  divider: {
    paddingBottom: 10,
    marginBottom: 10,
  },
  blockLine: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  btnSuccess: {
    backgroundColor: colors.primary,
  },
  btnDanger: {
    backgroundColor: colors.danger,
  },
});
