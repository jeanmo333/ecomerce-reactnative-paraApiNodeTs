/** @format */

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { API_URL } from "../../utils/constants";
import format from "../../utils/format";

export default function Order(props) {
  const { order } = props;
  function calcPrice(price, discount, quantity) {
    if (!discount) return price * quantity;

    const discountAmount = (price * discount) / 100;

    const priceTemp = price - discountAmount;
    return priceTemp * quantity;
  }

  return (
    <>
      {order.products.map((product) => (
        <View style={styles.container} key={product._id}>
          <View style={styles.containerImage}>
            <Image
              style={styles.image}
              source={{
                uri: `${product.images[0]}`,
              }}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
              {product.title}
            </Text>
            <Text style={styles.quantity}>Cantidad: {product.quantity}</Text>
            <Text style={styles.total}>
              Total pagado:{" "}
              {format(
                calcPrice(product.price, product.discount, product.quantity)
              )}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: -20,
    paddingVertical: 5,
    flexDirection: "row",
  },
  containerImage: {
    width: "30%",
    height: 120,
    padding: 10,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    width: "70%",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  total: {
    fontSize: 15,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 15,
  },
});
