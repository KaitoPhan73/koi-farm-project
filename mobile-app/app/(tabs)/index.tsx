import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { useSession } from "@/utils/ctx";
import { router, SplashScreen, useLocalSearchParams } from "expo-router";
import * as Font from "expo-font";
import { TextInput } from "react-native-gesture-handler";
import { TProductResponse } from "@/schema/product.schema";
import productAPI from "@/apis/product";
import { formatCurrency } from "@/utils/formatter";

import imageTP from "@/assets/images/chamsoc.jpg";
import nenbien from "@/assets/images/nenbien.jpg";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const { signOut } = useSession();
  const [loaded, error] = Font.useFonts({
    TitleKoi: require("../../assets/fonts/PirataOne-Regular.ttf"),
  });
  const [products, setProducts] = useState<TProductResponse[]>([]);

  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(0);
  const limit = 6;
  const { category, name } = useLocalSearchParams();

  const fetchProducts = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = { page, limit, category, name };
      const response = await productAPI.getProducts(params);
      setProducts(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    if (error) {
      console.error("Error loading font:", error);
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ScrollView
      className="flex-1"
      // contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Display the GIF at the top */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDQ1cTdkenk4anAwbzN3YnQ4ZW8xbGwycnFzeWxzNzNwM2N3MDYxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ltz3Bo9zG7GsBYjQQm/giphy.gif",
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.appNameContainer}>
          <Text
            style={{
              fontFamily: "TitleKoi",
              color: "#fff",
              fontSize: 50,
              letterSpacing: 10,
              textShadowColor: "#FFD700",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
            }}
          >
            <Text style={{ color: "#FFD700", letterSpacing: 10 }}>Golden</Text>{" "}
            KOI
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            // value={searchQuery}
            // onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <ImageBackground source={nenbien} resizeMode="cover">
        <Text style={styles.titleProduct}>Một số sản phẩm</Text>

        <View style={styles.cardContainer}>
          {products.slice(0, 4).map((product) => (
            <View key={product._id} style={styles.card}>
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.cardDescription}>
                  {product.category?.name}
                </Text>
                <Text style={styles.cardTitle}>{product.name}</Text>
              </View>
              <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            </View>
          ))}
        </View>
        {/* Nút xem thêm */}
        <TouchableOpacity
          onPress={() => {
            router.push("/product");
          }}
        >
          <Text style={styles.seeMoreText}>Xem thêm</Text>
        </TouchableOpacity>
        <Text style={styles.serviceTitle}>Dịch vụ kí gửi cá</Text>
        <View style={styles.serviceContainer}>
          <View style={styles.serviceCard}>
            <Image
              source={imageTP}
              style={styles.serviceImage}
              resizeMode="cover"
            />
            <View style={styles.ScontentContainer}>
              <Text style={styles.ScontentTitle}>Tiện lợi</Text>
              <Text style={styles.ScontentTitle}>An toàn</Text>
              <Text style={styles.Scontent}>
                Chúng tôi luôn mang lại dịch vụ tối ưu và đảm bảo an toàn cho
                "dế cưng" của bạn
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

// Define styles
const styles = StyleSheet.create({
  titleBackground: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
  },
  appNameContainer: {
    position: "absolute",
    top: "45%",
    left: "0%",
    right: "0%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  searchContainer: {
    marginTop: -100,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: "blue",
    marginTop: 20,
  },
  bodyStyle: {
    marginTop: 30,
  },
  searchInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    paddingLeft: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    margin: 15,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    color: "red",
    backgroundColor: "#FFC0CB",
    fontWeight: "bold",
    alignSelf: "flex-start",
    padding: 5,
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  cardDescription: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 6,
  },
  seeMoreText: {
    color: "white",
    marginTop: 0,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  titleProduct: {
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 50,
    marginLeft: 17,
    paddingVertical: 4,
    color: "black",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    borderRadius: 60,
  },
  serviceContainer: {
    marginHorizontal: 20,
    padding: 15,
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    marginBottom: 90,
  },
  serviceTitle: {
    marginTop: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    width: "100%",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  serviceCard: {
    width: "100%",
    height: "auto",
    marginRight: 10,
    alignItems: "center",
  },
  serviceImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 5,
  },
  ScontentContainer: {
    position: "absolute",
    bottom: 30,
    left: 10,
    // marginTop:-150,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  ScontentTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 2,
  },
  Scontent: {
    marginTop: 10,
    color: "white",
    width: 286,
    fontSize: 16,
  },
});
