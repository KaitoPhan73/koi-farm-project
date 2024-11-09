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
  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getProductsById(id);
        console.log("SSSSSSSSSSSSSSSSSSSSSSSS", response);
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

  // Return loading spinner or error message if data is not available
  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.tint} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const isInCart = cartItems.some((item) => item._id === id);
  console.log(product?.imageUrl, "product?.imageUrl");
  const handleAddToCart = async () => {
    if (product) {
      await addToCart({
        _id: product?._id,
        name: product?.name,
        price: product?.price,
        imageUrl: product?.imageUrl,
        quantity: 1,
      });
    }
  };
  console.log("product", product);
  const toggleCart = () => {
    if (isInCart) {
      removeFromCart(product._id);
    } else {
      handleAddToCart();
    }
  };

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
            Category: <Text style={styles.bold}>{product?.category.name}</Text>
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
          <Text style={styles.infoText}>
            Sale Type: <Text style={styles.bold}>{product?.saleType}</Text>
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
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -20, // Đẩy nội dung lên một chút để che phần dưới của ảnh
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  productImg: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    marginVertical: 4,
  },
  bold: {
    fontWeight: "600",
    color: "#333333",
  },
  addToCartButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#FF6F61",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default ProductDetails;
