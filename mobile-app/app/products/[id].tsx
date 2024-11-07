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
import { useCart } from "@/hooks/useCartActions"; // Hook cho giỏ hàng
import { router, Stack, useLocalSearchParams } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import productAPI from "@/apis/product"; // API lấy thông tin sản phẩm
import Colors from "@/constants/Colors"; // Màu sắc ứng dụng

const ProductDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); // Lấy id từ params
  const { addToCart, cartItems, removeFromCart } = useCart(); // Sử dụng hook giỏ hàng
  const [product, setProduct] = useState<any>(null); // Trạng thái thông tin sản phẩm
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal giỏ hàng

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

  const isInCart = cartItems.some((item) => item._id === id); // Kiểm tra sản phẩm có trong giỏ hàng không
  const openCart = () => {
    setModalVisible(true); // Mở modal giỏ hàng
  };

  const handleAddToCart = async () => {
    if (product) {
      await addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product?.imageUrl,
        quantity: 1, // Khởi tạo số lượng là 1 khi thêm vào giỏ hàng
      });
    }
  };

  const toggleCart = () => {
    if (isInCart) {
      removeFromCart(product._id); // Xóa sản phẩm khỏi giỏ hàng
    } else {
      handleAddToCart(); // Thêm sản phẩm vào giỏ hàng
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // Trạng thái loading
  }

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
          title: "Product Details", // Tiêu đề màn hình
        }}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: product?.imageUrl }} style={styles.productImg} />
        <Text style={styles.title}>{product?.name}</Text>
        <View style={styles.ratingWrapper}>
          <Ionicons name="star" size={16} color="#FFD700" />
        </View>

        <View style={styles.details}>
          <Text style={styles.infoText}>
            Price: <Text style={styles.bold}>${product?.price}</Text>
          </Text>
          <Text style={styles.infoText}>
            Brand:{" "}
            <Text style={styles.bold}>{product?.category?.name || "N/A"}</Text>
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

        <TouchableOpacity
          onPress={openCart}
          style={styles.viewCartButton}
        >
          <Text style={styles.viewCartText}>View Cart</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal giỏ hàng */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Đóng modal
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
                  <TouchableOpacity onPress={() => removeFromCart(item._id)}>
                    <AntDesign name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Text style={styles.totalPrice}>
              Total: {cartItems.reduce((total, item) => total + item.price, 0)}{" "}
              VND
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)} // Đóng modal
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
  contentContainer: { padding: 16 },
  productImg: { width: "100%", height: 200, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold" },
  ratingWrapper: { flexDirection: "row", marginVertical: 8 },
  details: { marginVertical: 8 },
  infoText: { fontSize: 16 },
  bold: { fontWeight: "bold" },
  description: { marginVertical: 8 },
  addToCartButton: {
    backgroundColor: "blue",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  addToCartText: { color: "white", fontSize: 16 },
  viewCartButton: {
    backgroundColor: "green",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  viewCartText: { color: "white", fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  cartItemText: { fontSize: 16 },
  cartItemPrice: { fontSize: 16 },
  totalPrice: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: { color: "white", fontSize: 16 },
});

export default ProductDetails;
