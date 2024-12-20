import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import Loading from "./Loading";
import Colors from "@/constants/Colors";
import { TProductResponse } from "@/schema/product.schema";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useCart } from "@/hooks/useCartActions";
import { TProductBaseResponse } from "@/schema/productbase.schema";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { formatCurrency } from "@/utils/formatter";

type Props = {
  productList: TProductResponse[];
};

const ProductList = ({ productList = [] }: Props) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const displayedProductList = showAll ? productList : productList.slice(0, 5);

  return (
    <>
      <View style={styles.container}>
        {productList.length === 0 ? (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>Not Found</Text>
          </View>
        ) : (
          displayedProductList.map((item) => (
            <View key={item._id} style={styles.itemWrapper}>
              <ProductItem
                item={item}
                isInCart={cartItems.some(
                  (cartItem) => cartItem._id === item._id
                )}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                onPress={() => router.push(`/products/${item._id}`)}
              />
            </View>
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
    </>
  );
};

const ProductItem = ({
  item,
  isInCart,
  addToCart,
  removeFromCart,
  onPress,
}: {
  item: TProductResponse;
  isInCart: boolean;
  addToCart: (item: any) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  onPress: () => void;
}) => {
  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart(item._id);
    } else {
      addToCart({
        _id: item._id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl || "",
        quantity: 1,
        product: item._id,
      });
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>
          {item.category?.name || "Unknown Category"}
        </Text>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatCurrency(item.price)}</Text>
        </View>
        <Text style={styles.itemOrigin}>Origin: {item.origin} </Text>
      </View>
      <TouchableOpacity onPress={handleCartAction} style={styles.cartButton}>
        <Ionicons
          name={isInCart ? "cart" : "cart-outline"}
          size={22}
          color={isInCart ? "red" : Colors.black}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  itemWrapper: {
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemCategory: {
    fontSize: 16,
    color: Colors.darkGrey,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  itemSourceName: {
    fontSize: 16,
    color: "green",
  },
  itemOrigin: {
    fontSize: 16,
    color: Colors.black,
  },
  cartButton: {
    padding: 5,
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
  priceContainer: {
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: Colors.black,
  },
  notFoundContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: Colors.darkGrey,
    fontWeight: "bold",
  },
});

export default ProductList;
