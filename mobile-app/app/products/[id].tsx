import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useCart } from "@/hooks/useCartActions";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import productAPI from "@/apis/product";
import Colors from "@/constants/Colors";
import CartModal from "@/components/cart-modal";
import { formatCurrency } from "@/utils/formatter";

const ProductDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart, cartItems, removeFromCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getProductsById(id);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details.");
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
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
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

  const navigateToCheckout = () => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    router.push({
      pathname: "/products/checkout",
      params: { totalPrice },
    });
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.tint} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
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
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ marginRight: 15 }}
            >
              <AntDesign name="shoppingcart" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView>
        <Image source={{ uri: product?.imageUrl }} style={styles.productImg} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product?.name}</Text>
          <Text style={styles.infoText}>
            Category: <Text style={styles.bold}>{product?.category?.name}</Text>
          </Text>
          <Text style={styles.infoText}>
            Breed: <Text style={styles.bold}>{product?.breed}</Text>
          </Text>
          <Text style={styles.infoText}>
            Origin: <Text style={styles.bold}>{product?.origin}</Text>
          </Text>
          <Text style={styles.infoText}>
            Size: <Text style={styles.bold}>{product?.descriptionSize}</Text>
          </Text>
          <Text style={styles.infoText}>
            Age: <Text style={styles.bold}>{product?.age} years</Text>
          </Text>
          <Text style={styles.infoText}>
            Gender: <Text style={styles.bold}>{product?.gender}</Text>
          </Text>
          <Text style={styles.infoText}>
            Personality: <Text style={styles.bold}>{product?.personality}</Text>
          </Text>
          <Text style={styles.infoText}>
            Price:{" "}
            <Text style={styles.bold}>{formatCurrency(product?.price)}</Text>
          </Text>
          <Text style={styles.infoText}>
            Stock: <Text style={styles.bold}>{product?.stock} available</Text>
          </Text>
          {product?.consignment?.isConsignment && (
            <Text style={styles.infoText}>
              Consignment Supplier:{" "}
              <Text style={styles.bold}>{product?.consignment?.supplier}</Text>
            </Text>
          )}
          <TouchableOpacity style={styles.addToCartButton} onPress={toggleCart}>
            <Text style={styles.addToCartText}>
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CartModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
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
  infoText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  bold: {
    fontWeight: "bold",
    color: "#333",
  },
  addToCartButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  emptyCartText:{}
});

export default ProductDetails;
