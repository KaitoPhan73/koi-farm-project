import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import Colors from "@/constants/Colors";
import apiClient from "@/apis/apiClient";
import { useSession } from "@/utils/ctx";

interface PaymentProps {
  totalAmount: number;
  cartItems: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    product: string; // ID của product
  }[];
}

const PaymentScreen: React.FC<PaymentProps> = ({ totalAmount, cartItems }) => {
  const [loading, setLoading] = useState(false);
  const { session } = useSession();

  const createOrderItem = async (item: any) => {
    const orderItemData = {
      product: item.product, // Use product ID if available, fallback to _id
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    };

    try {
      const response = await apiClient.post(
        `${process.env.EXPO_PUBLIC_API_URL}order-items`,
        orderItemData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating order item:", error);
      throw error;
    }
  };
  console.log("cart", cartItems);
  const handleZaloPay = async () => {
    if (!session) {
      Alert.alert("Error", "Please login to continue");
      return;
    }

    try {
      setLoading(true);
      const userData = JSON.parse(session);

      // Create all order items concurrently
      const orderItemPromises = cartItems.map((item) => createOrderItem(item));
      const createdOrderItems = await Promise.all(orderItemPromises);

      // Create order with the created items
      const orderData = {
        userId: userData.user._id,
        items: createdOrderItems.map((item) => item._id), // Assuming the API returns created items with _id
        totalAmount,
        status: "Pending",
      };

      // Create order
      const orderResponse = await apiClient.post(
        `${process.env.EXPO_PUBLIC_API_URL}orders`,
        orderData
      );

      // Process ZaloPay payment
      const paymentResponse = await apiClient.post(
        `${process.env.EXPO_PUBLIC_API_URL}payment`,
        {
          amount: totalAmount,
          orderId: orderResponse.data._id, // Pass orderId to payment
        }
      );

      if (paymentResponse.data?.order_url) {
        await Linking.openURL(paymentResponse.data.order_url);
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (error) {
      console.error("Payment process error:", error);
      Alert.alert(
        "Payment Error",
        "An error occurred during the payment process. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleZaloPay}
      style={[styles.zaloPayButton, loading && styles.disabledButton]}
      disabled={loading}
    >
      <Text style={styles.buttonText}>
        {loading ? "Processing..." : "Continue to Payment"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  zaloPayButton: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PaymentScreen;
