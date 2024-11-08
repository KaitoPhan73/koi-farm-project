import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { useCart } from "@/hooks/useCartActions"; // Assuming this handles cart logic
import { router, Stack, useLocalSearchParams } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import productAPI from "@/apis/product";
import Colors from "@/constants/Colors";

const ProductDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart, cartItems, removeFromCart, updateCartItemQuantity } = useCart(); // Assuming the hook manages quantity
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getProductBaseById(id);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const isInCart = cartItems.some((item) => item._id === id);

  const handleAddToCart = async () => {
    if (product) {
      await addToCart({
        _id: product._id,
        name: product.name,
        price: product.basePrice,
        imageUrl: product.imageUrl,
        quantity: 1, // Adding a product with 1 as quantity
      });
    }
  };

  const toggleCart = () => {
    if (isInCart) {
      removeFromCart(product._id);
    } else {
      handleAddToCart();
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // Loading indicator while fetching product data
  }

  return (
    <>
      <Stack.Screen

        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginRight: 15 }}>
              <AntDesign name="shoppingcart" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),

        }}
      />
      <ScrollView>
        <Image source={{ uri: product?.imageUrl }} style={styles.productImg} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product?.name}</Text>
          <View style={styles.ratingWrapper}>
            <Ionicons name="star" size={16} color="#FFD700" />
          </View>

          <View style={styles.details}>
            <Text style={styles.infoText}>
              Price: <Text style={styles.bold}>{product.basePrice} VND</Text>
            </Text>
            <Text style={styles.infoText}>
              Brand: <Text style={styles.bold}>{product.category?.name || "N/A"}</Text>
            </Text>
          </View>

          <Text style={styles.description}>
            Description: {product?.description || "N/A"}
          </Text>

          <TouchableOpacity style={styles.addToCartButton} onPress={toggleCart}>
            <Text style={styles.addToCartText}>
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.viewCartButton}>
            <Text style={styles.viewCartText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text style={styles.cartItemText}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>{item.price} VND</Text>
                  <View style={styles.cartItemActions}>
                    <TouchableOpacity
                      onPress={() => updateCartItemQuantity(item._id, item.quantity + 1)}
                    >
                      <Ionicons name="add-circle" size={20} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => updateCartItemQuantity(item._id, item.quantity - 1)}
                    >
                      <Ionicons name="remove-circle" size={20} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeFromCart(item._id)}>
                      <AntDesign name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <Text style={styles.totalPrice}>
              Total: {cartItems.reduce((total, item) => total + item.price, 0)} VND
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
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  productImg: {
    width: "100%",
    height: 250,
    marginBottom: 16,
    borderRadius: 12,
    resizeMode: "cover",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  ratingWrapper: {
    flexDirection: "row",
    marginVertical: 8
  },
  details: {
    marginVertical: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  infoText: {
    fontSize: 16,
    color: "#555"
  },
  bold: {
    fontWeight: "bold",
    color: "#333"
  },
  description: {
    marginVertical: 12,
    color: "#666",
    fontSize: 14,
  },
  addToCartButton: {
    backgroundColor: "#1e90ff",  // Blue color
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  viewCartButton: {
    backgroundColor: "#32cd32",  // Green color
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  viewCartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
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
    elevation: 5,  // Add shadow effect for Android
    shadowColor: "#000",  // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cartItemText: {
    fontSize: 16,
    color: "#333",
    width: "50%",
  },
  cartItemPrice: {
    fontSize: 16,
    color: "#333",
    width: "30%",
    textAlign: "center"
  },
  cartItemActions: {
    flexDirection: "row",
    alignItems: "center"
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#ff6347",  // Red color
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 12,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16
  },
});

export default ProductDetails;
