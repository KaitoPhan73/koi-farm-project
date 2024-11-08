import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useCart } from "@/hooks/useCartActions";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();
  const navigation = useNavigation();

  const navigateToOrderItem = () => {
    const serializedCartItems = JSON.stringify(cartItems); // Serialize the cartItems

    router.push({
      pathname: "/products/orderitem", // Navigate to OrderItem page
      params: { cartItems: serializedCartItems }, // Pass serialized cartItems
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
          {cartItems.length > 0 ? (
            <>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.cartItemImage}
                    />
                    <Text style={styles.cartItemText}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>{item.price} VND</Text>
                    <View style={styles.cartItemActions}>
                      <TouchableOpacity
                        onPress={() =>
                          updateCartItemQuantity(item._id, item.quantity + 1)
                        }
                      >
                        <Ionicons name="add-circle" size={20} color="green" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          updateCartItemQuantity(item._id, item.quantity - 1)
                        }
                      >
                        <Ionicons name="remove-circle" size={20} color="red" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => removeFromCart(item._id)}
                      >
                        <AntDesign name="delete" size={24} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
              <Text style={styles.totalPrice}>
                Total:{" "}
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}{" "}
                VND
              </Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={navigateToOrderItem}
                  style={styles.paymentButton}
                >
                  <Text style={styles.paymentButtonText}>Tiếp Tục</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

// Styles remain the same, with the close button positioned at the top right corner
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "85%",
    maxHeight: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "relative", // To position the close button
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1, // Ensures the close button stays on top of the content
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cartItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  cartItemText: { fontSize: 16 },
  cartItemPrice: { fontSize: 16 },
  cartItemActions: { flexDirection: "row", alignItems: "center" },
  totalPrice: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  paymentButton: {
    backgroundColor: "blue",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  paymentButtonText: { color: "white", fontSize: 16 },
  emptyCartText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
});

export default CartModal;
