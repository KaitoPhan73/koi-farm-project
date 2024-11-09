import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useSession } from "@/utils/ctx";
import { SplashScreen, useLocalSearchParams, useRouter } from "expo-router";
import * as Font from "expo-font";
import { TProductResponse } from "@/schema/product.schema";
import productAPI from "@/apis/product";
import { formatCurrency } from "@/utils/formatter";

import imageTP from "@/assets/images/chamsoc.jpg";
import nenbien from "@/assets/images/nenbien.jpg";
import { ActivityIndicator } from "react-native-paper";

// Prevent the splash screen from hiding until the app is ready
SplashScreen.preventAutoHideAsync();

interface Blog {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
  tags: string[];
}

export default function HomeScreen() {
  const { signOut } = useSession();

  // Font loading state (placed at the top to follow a consistent order of hooks)
  const [loaded, error] = Font.useFonts({
    TitleKoi: require("../../assets/fonts/PirataOne-Regular.ttf"),
  });

  // State hooks for managing product data, blogs, loading state
  const [products, setProducts] = useState<TProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [Isloading, setIsLoading] = useState<boolean>(true);
  const [displayedBlogsCount, setDisplayedBlogsCount] = useState<number>(5);

  const { category, name } = useLocalSearchParams();
  const router = useRouter();

  // Fetch products data
  const fetchProducts = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 6, category, name };
      const response = await productAPI.getProducts(params);
      setProducts(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blog data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://67207d30e7a5792f0531a995.mockapi.io/api/blog/blogs"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle font loading and splash screen hiding
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    if (error) {
      console.error("Error loading font:", error);
    }
  }, [loaded, error]);

  // Fetch products on initial render
  useEffect(() => {
    fetchProducts();
  }, [category, name]); // Fetch products when category or name changes

  // If the fonts are still loading, return nothing
  if (!loaded && !error) {
    return null;
  }

  // Handle toggle of blog display (see more/see less)
  const handleToggle = () => {
    setDisplayedBlogsCount(
      displayedBlogsCount < blogs.length ? blogs.length : 5
    );
  };

  // Filter blogs based on how many to display
  const displayedBlogs = blogs.slice(0, displayedBlogsCount);

  if (Isloading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  // Render blog item for FlatList
  const renderBlogItem = ({ item }: { item: Blog }) => (
    <TouchableOpacity
      style={styles.blogItem}
      onPress={() => router.push(`/blog/${item.id}`)}
    >
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text
        style={styles.blogDescription}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1">
      {/* Top image section */}
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
      </View>

      {/* Display products */}
      <ImageBackground source={nenbien} resizeMode="cover">
        <Text style={styles.titleProduct}>PRODUCTS</Text>
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

        {/* See more button */}
        <TouchableOpacity onPress={() => router.push("/product")}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>

        {/* Service section */}
        <Text style={styles.serviceTitle}>SERVICE</Text>
        <View style={styles.serviceContainer}>
          <View style={styles.serviceCard}>
            <Image
              source={imageTP}
              style={styles.serviceImage}
              resizeMode="cover"
            />
            <View style={styles.ScontentContainer}>
              <Text style={styles.ScontentTitle}>Convenient</Text>
              <Text style={styles.ScontentTitle}>Safe</Text>
              <Text style={styles.Scontent}>
                We always provide the best service and ensure the safety of your
                "pet"
              </Text>
            </View>
          </View>
        </View>

        {/* Blog section */}
        <Text style={styles.serviceTitle}>PERSONAL BLOG</Text>
        <FlatList
          scrollEnabled={false}
          data={displayedBlogs}
          renderItem={renderBlogItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.seeMoreButton}
              onPress={handleToggle}
            >
              <Text style={styles.seeMoreTextBlog}>
                {displayedBlogsCount < blogs.length ? "See More" : "See Less"}
              </Text>
            </TouchableOpacity>
          }
        />
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
    marginVertical: 20,
    paddingVertical: 4,
    color: "black",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignSelf: "center",
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
  container: {
    padding: 20,
    // backgroundColor: '#f0f4f8',
  },
  blogItem: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  blogDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
  },
  seeMoreButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFA500",
    borderRadius: 8,
    alignItems: "center",
  },
  seeMoreTextBlog: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
