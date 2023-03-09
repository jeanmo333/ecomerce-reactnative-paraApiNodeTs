/** @format */

import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { map, size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";
import { Button, Divider } from "react-native-paper";

export default function AddressList(props) {
  const { addresses, selectedAddress, setSelectedAddress } = props;

  const navigation = useNavigation();

  useEffect(() => {
    addresses && setSelectedAddress(addresses[0]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Direccion de envio</Text>
      <Divider style={styles.divider} />
      {size(addresses) === 0 && (
        <Button
          mode='contained'
          style={styles.btnAdd}
          onPress={() => navigation.navigate("add-address")}>
          Agregar direccion
        </Button>
      )}

      {map(addresses, (address) => (
        <TouchableWithoutFeedback
          key={address._id}
          onPress={() => setSelectedAddress(address)}>
          <View
            style={[
              styles.address,
              address._id === selectedAddress?._id && styles.checked,
            ]}>
            <Text style={styles.title}>{address.title}</Text>
            <Text>{address.name_lastname}</Text>
            <Text>{address.address}</Text>
            <View style={styles.blockLine}>
              <Text>{address.state}, </Text>
              <Text>{address.city}, </Text>
              <Text>{address.postal_code}</Text>
            </View>
            <Text>{address.country}</Text>
            <Text>Numero de telefono: {address.phone}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  containerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnAdd: {
    marginTop: 10,
  },
  address: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
    fontSize: 20,
    textAlign: "center",
  },
  blockLine: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  checked: {
    borderColor: colors.primary,
    backgroundColor: "#0098d330",
  },
  divider: {
    padding: 5,
    marginBottom: 10,
  },
  dividerSelect: {
    padding: 1,
    marginBottom: 15,
  },
});
