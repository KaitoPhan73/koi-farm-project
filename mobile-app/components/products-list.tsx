import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Loading from "./Loading";
import Colors from "@/constants/Colors";
import { AddToCartParams, useCart } from "@/hooks/useCartActions"; // Import custom hook
import { TProductResponse } from "@/schema/product.schema";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  productList: TProductResponse[];
};

const ProductList = ({ productList = [] }: Props) => {
  const { cartItems, addToCart, removeFromCart } = useCart(); // Use the custom hook
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  // Determine which products to display
  const displayedProductList = showAll ? productList : productList.slice(0, 5);

  return (
    <View style={styles.container}>
      {productList.length === 0 ? (
        <Loading size="large" />
      ) : (
        displayedProductList.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => router.push(`/news/${item._id}`)}
          >
            <ProductItem
              item={item}
              isInCart={cartItems.some((cartItem) => cartItem._id === item._id)} // Check if the product is in the cart
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </TouchableOpacity>
        ))
      )}
      {productList.length > 5 && !showAll && (
        <TouchableOpacity
          onPress={() => setShowAll(true)}
          style={styles.seeMoreButton}
        >
          <Text style={styles.seeMoreText}>See More...</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ProductItem = ({
  item,
  isInCart,
  addToCart,
  removeFromCart,
}: {
  item: TProductResponse;
  isInCart: boolean;
  addToCart: (item: AddToCartParams) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
}) => {
  // Tạo hàm xử lý thêm/xóa sản phẩm
  const handleCartAction = () => {
    const params: AddToCartParams = {
      _id: item._id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl || "",
      quantity: 1,
      // Các thuộc tính khác cần thiết nếu cần
    };

    if (isInCart) {
      removeFromCart(item._id);
    } else {
      addToCart(params);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>
          {item.category?.name || "Unknown Category"}
        </Text>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSourceName}>Price: {item.price} VND</Text>
      </View>
      <TouchableOpacity onPress={handleCartAction}>
        <Ionicons
          name="bag-add"
          size={22}
          color={isInCart ? "red" : Colors.black}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  itemCategory: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.black,
  },
  itemSourceName: {
    fontSize: 10,
    fontWeight: "400",
    color: Colors.tint,
  },
  seeMoreButton: {
    marginTop: 10,
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.tint,
    borderRadius: 5,
  },
  seeMoreText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ProductList;
