import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import Colors from "@/constants/Colors";
import PaymentScreen from "./payment";
import { formatCurrency } from "@/utils/formatter";
import { Stack } from "expo-router";

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
    <>
      <Stack.Screen
        options={{
          headerTitle: "Order Summary",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <FlatList
            data={cartItems}
            scrollEnabled={true}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text
                  style={styles.cartItemText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name} x {item.quantity}
                </Text>
                <Text style={styles.cartItemPrice}>
                  {formatCurrency(item.price * item.quantity)}
                </Text>
              </View>
            )}
          />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.totalPrice}>
            Total: {formatCurrency(totalAmount)}
          </Text>
          <PaymentScreen totalAmount={totalAmount} cartItems={cartItems} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cartItemText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  cartItemPrice: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "right",
    color: Colors.primary,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});

export default OrderItemScreen;
