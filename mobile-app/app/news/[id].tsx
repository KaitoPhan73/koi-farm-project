import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Loading from "@/components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { TProductResponse } from "@/schema/product.schema";
import Colors from "@/constants/Colors";

// Main Component
const NewsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [news, setNews] = useState<TProductResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (!isLoading && news) checkBookmark(news._id);
  }, [isLoading, news]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/${id}`);
      if (response.data) {
        setNews(response.data);
        setIsLoading(false);
      }
    } catch (err:any) {
      console.log("Error Message: ", err.message);
    }
  };

  const toggleBookmark = async () => {
    const bookmarks = JSON.parse(await AsyncStorage.getItem("bookmark") || "[]");
    const updatedBookmarks = bookmark
      ? bookmarks.filter((item: string) => item !== id)
      : [...bookmarks, id];
    await AsyncStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
    setBookmark(!bookmark);
    Toast.show({
      type: "success",
      text1: bookmark ? "Removed from Bookmarks" : "Saved to Bookmarks",
    });
  };

  const checkBookmark = async (id: string) => {
    const bookmarks = JSON.parse(await AsyncStorage.getItem("bookmark") || "[]");
    setBookmark(bookmarks.includes(id));
  };

  // const calculateAverageRating = () => {
  //   if (news && news.comments.length) {
  //     return (news.comments.reduce((acc, { rating }) => acc + rating, 0) / news.comments.length).toFixed(1);
  //   }
  //   return "0";
  // };

  if (isLoading || !news) return <Loading size="large" />;

  return (
    <>
      <Stack.Screen options={{
        title: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={toggleBookmark}>
            <Ionicons
              name={bookmark ? "heart" : "heart-outline"}
              size={22}
              color={bookmark ? "red" : Colors.black}
            />
          </TouchableOpacity>
        )
      }} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: news.imageUrl }} style={styles.newsImg} />
        <Text style={styles.title}>{news.name}</Text>
        <View style={styles.ratingWrapper}>
          <Ionicons name="star" size={16} color="#FFD700" />
          {/* <Text style={styles.ratingText}>
            {calculateAverageRating()} ({news.comments.length} reviews)
          </Text> */}
        </View>
        <View style={styles.details}>
          <Text style={styles.infoText}>Price: <Text style={styles.bold}>${news.price}</Text></Text>
          <Text style={styles.infoText}>Brand: <Text style={styles.bold}>{news.category}</Text></Text>
        </View>
        {/* {news.limitedTimeDeal > 0 && <Text style={styles.highlight}>💰 Save {news.limitedTimeDeal * 100}%</Text>}
        {news.glassSurface && <Text style={styles.highlight}>✔️ Suitable for glass surfaces</Text>} */}
        <Text style={styles.description}>Description: {news.dailyFeedAmount}</Text>
        {/* <Link href={`/news/comment?id=${news._id}`} asChild>
          <TouchableOpacity style={styles.commentButton}>
            <Text style={styles.commentButtonText}>View Comments</Text>
          </TouchableOpacity>
        </Link> */}
      </ScrollView>
    </>
  );
};

export default NewsDetails;

// Styles
const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: Colors.white,
  },
  newsImg: {
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
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#555",
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
  highlight: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 22,
  },
  commentButton: {
    backgroundColor: Colors.black,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  commentButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});
