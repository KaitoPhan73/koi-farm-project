import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Linking } from "react-native";
import axios from "axios";
import Colors from "@/constants/Colors";
import apiClient from "@/apis/apiClient";

interface PaymentProps {
  totalAmount: number;
  cartItems: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
}

const PaymentScreen: React.FC<PaymentProps> = ({ totalAmount, cartItems }) => {
  const [loading, setLoading] = useState(false);

  const createOrderItem = async (item: any) => {
    const orderItemData = {
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    };

    const response = await apiClient.post(
      `${process.env.EXPO_PUBLIC_API_URL}order-items`,
      orderItemData
    );
    return response.data;
  };

  const handleZaloPay = async () => {
    try {
      setLoading(true);
      const userId = "672da99cf5b1006f814e643b";

      // Tạo tất cả orderItems cùng lúc
      const orderItemPromises = cartItems.map((item) => createOrderItem(item));
      const createdOrderItems = await Promise.all(orderItemPromises);

      console.log("All order items created:", createdOrderItems);

      // Tạo order với các orderItems đã tạo
      const orderData = {
        userId,
        items: createdOrderItems,
        totalAmount,
        status: "Pending",
      };

      console.log("Sending order data:", JSON.stringify(orderData, null, 2));

      // Tạo order
      const orderResponse = await apiClient.post(
        `${process.env.EXPO_PUBLIC_API_URL}orders`,
        orderData
      );

      console.log("Order created successfully:", orderResponse.data);

      // Xử lý thanh toán ZaloPay
      const paymentResponse = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}payment`,
        { amount: totalAmount }
      );

      if (paymentResponse.data?.order_url) {
        console.log(
          "Redirecting to payment URL:",
          paymentResponse.data.order_url
        );
        await Linking.openURL(paymentResponse.data.order_url);
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
      }
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
        {loading ? "Processing..." : "Continue and Pay"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  zaloPayButton: {
    backgroundColor: Colors.tint,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
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
