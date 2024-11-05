import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Loading from "@/components/Loading";
import Colors from "@/constants/Colors";
import productAPI from "@/apis/product";
import useCartActions from "@/hooks/useCartActions";
import { TProductResponse } from "@/schema/product.schema";

const ProductDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<TProductResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { cartItems, saveToCart, removeFromCart } = useCartActions();
  const [modalVisible, setModalVisible] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const openCart = () => setModalVisible(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getProductsById(id);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setIsInCart(cartItems.some(item => item.id === product._id)); // Check if product is in cart
    }
  }, [cartItems, product]);

  const toggleCart = async () => {
    if (isInCart) {
      const itemToRemove = cartItems.find(item => item.id === product!._id);
      if (itemToRemove) {
        await removeFromCart(itemToRemove.id); 
      }
    } else {
      await saveToCart(
        product!._id,
        product!.imageUrl || '', 
        product!.name,
        product!.price,
        product!.stock
      );
    }
    setIsInCart(!isInCart);
  };

  if (isLoading || !product) return <Loading size="large" />;

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={openCart} style={{ marginRight: 15 }}>
              <AntDesign name="shoppingcart" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.productImg} />
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.ratingWrapper}>
          <Ionicons name="star" size={16} color="#FFD700" />
        </View>

        <View style={styles.details}>
          <Text style={styles.infoText}>
            Price: <Text style={styles.bold}>${product.price}</Text>
          </Text>
          <Text style={styles.infoText}>
            Brand:{" "}
            <Text style={styles.bold}>{product.category?.name || "N/A"}</Text>
          </Text>
        </View>

        <Text style={styles.description}>Description: {product.dailyFeedAmount}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton} onPress={toggleCart}>
          <Text style={styles.addToCartText}>
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text style={styles.cartItemText}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>{item.price} VND</Text>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <AntDesign name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Text style={styles.totalPrice}>
              Total: {cartItems.reduce((total, item) => total + item.price, 0)} VND
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProductDetails;

// Styles
const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: Colors.white,
  },
  productImg: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.black,
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    color: Colors.darkGrey,
  },
  bold: {
    fontWeight: "900",
  },
  description: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 22,
  },
  addToCartButton: {
    backgroundColor: Colors.black,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addToCartText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    padding: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
});
