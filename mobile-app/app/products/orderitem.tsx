import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import Colors from "@/constants/Colors";
import PaymentScreen from "./payment";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

type RouteParams = {
  params: {
    cartItems: string;
  };
};

const OrderItemScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const cartItems: CartItem[] = JSON.parse(route.params.cartItems);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.cartItemText}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>
                  {item.price} VND x {item.quantity}
                </Text>
              </View>
            )}
          />
          <Text style={styles.totalPrice}>
            Total: {totalAmount} VND
          </Text>
          <PaymentScreen totalAmount={totalAmount} cartItems={cartItems} />
        </>
      ) : (
        <Text>Your cart is empty</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cartItemText: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
    color: "gray",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default OrderItemScreen;
