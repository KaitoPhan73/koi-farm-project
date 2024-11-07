import { Tabs } from "expo-router";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import TabBar from "@/components/tab-bar";
import { useSession } from "@/utils/ctx";
import { StyleSheet, Text, Modal, View, TouchableOpacity } from "react-native";
import { Redirect } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const [modalVisible, setModalVisible] = useState(false);

  // Display loading text if session data is being fetched
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Redirect to sign-in page if there's no session
  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home Page",
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="product"
          options={{
            headerShown: true,
            title: "Product",
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <Ionicons name="fish-outline" size={24} color={color} />
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
            title: "Blogs",
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
            headerRight: () => (
              <TouchableOpacity style={styles.headerLogoutButton}>
                <AntDesign name="logout" size={20} color="orange" />
                <Text style={styles.headerLogoutText}>Logout</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
      );



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
            <Text style={styles.totalPrice}>Cart Summary</Text>
            <View style={styles.cartItem}>
              <Text style={styles.cartItemText}>Item 1</Text>
              <Text style={styles.cartItemPrice}>$10</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
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
  headerLogoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  headerLogoutText: {
    color: "orange",
    fontSize: 16,
    marginLeft: 5,
  },
});
