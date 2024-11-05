import { Tabs } from "expo-router";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { useCart } from "@/hooks/useCartActions";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const { cartItems, calculateTotalPrice, removeFromCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);

  const openCart = () => {
    console.log("Cart Items Length on Open:", cartItems.length); // Log chiều dài giỏ hàng khi mở
    setModalVisible(true);
  };

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: true,
            title: "Home Page",
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />{" "}
        <Tabs.Screen
          name="product"
          options={{
            headerShown: true,
            title: "Product",
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <AntDesign name="info" size={24} color={color} />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={openCart} style={{ marginRight: 15 }}>
                <AntDesign name="shoppingcart" size={24} color={Colors.black} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="deposit"
          options={{
            headerShown: true,
            title: "Deposit",
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <AntDesign name="form" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="blog"
          options={{
            title: "Blog",
            headerTitleAlign: "center",
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="new-label" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: true,
            title: "Profile",
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <AntDesign name="profile" size={24} color={color} />
            ),
          }}
        />{" "}
      </Tabs>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item._id} // Sử dụng _id thay vì id
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text style={styles.cartItemText}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>{item.price} VND</Text>
                  <Text style={styles.cartItemQuantity}>
                    Quantity: {item.quantity}
                  </Text>
                  <TouchableOpacity onPress={() => removeFromCart(item._id)}>
                    <AntDesign name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Text style={styles.totalPrice}>
              Total: {calculateTotalPrice()} VND
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  cartItemText: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.tint,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  cartItemQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
