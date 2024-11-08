import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from "axios"; // To make API calls
import Colors from "@/constants/Colors";

// Type definition for the cart item
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

type RouteParams = {
  params: {
    cartItems: string; // Serialized string of cart items
  };
};

const OrderItemScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const router = useRouter();

  const [loading, setLoading] = useState(false); // To handle loading state
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null); // Store the payment URL

  const cartItems: CartItem[] = JSON.parse(route.params.cartItems); // Parse the serialized cart items

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleZaloPay = async () => {
    try {
      setLoading(true);
      const orderData = {
        cartItems: cartItems,
        totalAmount: totalAmount,
        status: "Pending", 
      };

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/order-items`, 
        orderData
      );
    } catch (error) {
      console.error("Order initiation failed:", error);
    } finally {
      setLoading(false);
    }
    try {
      const amount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}payment`,
        { amount }
      );

      if (response.data && response.data.order_url) {
        Linking.openURL(response.data.order_url).catch((err) =>
          console.error("Failed to open URL:", err)
        );
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

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
          <TouchableOpacity
            onPress={handleZaloPay} 
            style={styles.zaloPayButton}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.buttonText}>Processing...</Text>
            ) : (
              <Text style={styles.buttonText}>Lưu Đơn Hàng và Thanh Toán</Text>
            )}
          </TouchableOpacity> 
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
  zaloPayButton: {
    backgroundColor: Colors.tint,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default OrderItemScreen;
