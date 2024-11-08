import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Linking } from "react-native";
import axios from "axios";
import Colors from "@/constants/Colors";

interface PaymentProps {
  totalAmount: number;
  cartItems: { _id: string; name: string; price: number; quantity: number; imageUrl: string }[];
}

const PaymentScreen: React.FC<PaymentProps> = ({ totalAmount, cartItems }) => {
  const [loading, setLoading] = useState(false);

  const handleZaloPay = async () => {
    try {
      setLoading(true);
      
      // Log thông tin người dùng và đơn hàng trước khi gửi yêu cầu
      const userId = "672bb7306db8381653235e2d"; // Thay thế bằng ID người dùng thực tế

      // Dữ liệu cho đơn hàng (Order)
      const orderData = {
        user: userId,
        items: cartItems.map(item => ({
          productId: item._id, // ID của sản phẩm
          name: item.name,      // Tên sản phẩm
          price: item.price,    // Giá sản phẩm
          quantity: item.quantity, // Số lượng sản phẩm
          imageUrl: item.imageUrl, // Hình ảnh của sản phẩm
        })),
        totalAmount: totalAmount,
        status: "Pending", // Trạng thái ban đầu của đơn hàng
      };

      console.log("Sending order data:", orderData);

      // Tạo đơn hàng mới
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}orders`, // Thay thế bằng URL API thực tế
        orderData
      );

      console.log("Order created successfully:", response.data);

      // Log thông tin trước khi gửi yêu cầu thanh toán ZaloPay
      const paymentResponse = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}payment`, // Thay thế bằng URL API thực tế
        { amount: totalAmount }
      );

      console.log("Payment response:", paymentResponse.data);

      if (paymentResponse.data && paymentResponse.data.order_url) {
        // Mở URL thanh toán
        console.log("Redirecting to payment URL:", paymentResponse.data.order_url);
        Linking.openURL(paymentResponse.data.order_url).catch((err) =>
          console.error("Failed to open URL:", err)
        );
      }

      // Sau khi thanh toán thành công, lưu OrderItems
      const orderItemsData = cartItems.map(item => ({
        productId: item._id, // ID sản phẩm
        name: item.name,      // Tên sản phẩm
        price: item.price,    // Giá sản phẩm
        quantity: item.quantity, // Số lượng sản phẩm
        imageUrl: item.imageUrl, // Hình ảnh sản phẩm
      }));
      console.log("Saving order items:", orderItemsData);

      const orderItemsResponse = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}order-items`, // Thay thế bằng URL API thực tế
        orderItemsData
      );

      console.log("Order items saved:", orderItemsResponse.data);

    } catch (error) {
      console.error("Error during payment initiation:");
      if (error) {
        console.error("Error response data:");
        console.error("Error response status:");
        console.error("Error response headers:");
      } else {
        console.error("Error message:");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleZaloPay}
      style={styles.zaloPayButton}
      disabled={loading}
    >
      {loading ? (
        <Text style={styles.buttonText}>Processing...</Text>
      ) : (
        <Text style={styles.buttonText}>Tiếp Tục và Thanh Toán</Text>
      )}
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
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PaymentScreen;
