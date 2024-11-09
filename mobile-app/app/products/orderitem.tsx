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
  product: string;
}

type RouteParams = {
  params: {
    cartItems: string;
  };
};

const OrderItemScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const cartItems: CartItem[] = JSON.parse(route.params.cartItems).map(
    (item: any) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
      product: item.product,
    })
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text
          style={styles.cartItemText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
        <Text style={styles.cartItemPrice}>
          {formatCurrency(item.price * item.quantity)}
        </Text>
      </View>
    </View>
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
            renderItem={renderItem}
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  itemInfo: {
    flex: 1,
    marginRight: 16,
  },
  cartItemText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  quantityText: {
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "line-through",
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
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
