import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import axios from "axios";
import Colors from "@/constants/Colors";
import apiClient from "@/apis/apiClient";
import { useSession } from "@/utils/ctx"; // Import useSession
import { router } from "expo-router";

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
  const { session } = useSession(); // Lấy session từ context
  const sessionData = session ? JSON.parse(session) : null;

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
    if (!session) {
      Alert.alert("Error", "Please login to continue");
      router.push("/sign-in");
      return;
    }

    try {
      setLoading(true);

      // Tạo tất cả orderItems cùng lúc
      const orderItemPromises = cartItems.map((item) => createOrderItem(item));
      const createdOrderItems = await Promise.all(orderItemPromises);

      console.log("All order items created:", createdOrderItems);

      // Tạo order với các orderItems đã tạo và userId từ session
      const orderData = {
        userId: sessionData?.user?._id,
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
      Alert.alert("Error", "Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  };
  d;

  return (
    <TouchableOpacity
      onPress={handleZaloPay}
      style={[styles.paymentButton, loading && styles.disabledButton]}
      disabled={loading || !session}
    >
      <Text style={styles.buttonText}>
        {loading ? "Đang xử lý..." : "Tiếp Tục và Thanh Toán"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paymentButton: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
