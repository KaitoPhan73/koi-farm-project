import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { TProductResponse } from "@/schema/product.schema";
import Loading from "./Loading";
import Colors from "@/constants/Colors";

type Props = {
  newsList: TProductResponse[];
};

const NewsList = ({ newsList = [] }: Props) => {
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = await AsyncStorage.getItem("bookmark");
      const bookmarks = token ? JSON.parse(token) : [];
      setBookmarkedItems(bookmarks);
    };
    fetchBookmarks();
  }, []);

  const saveBookmark = async (id: string) => {
    const newBookmarks = [...bookmarkedItems, id];
    await AsyncStorage.setItem("bookmark", JSON.stringify(newBookmarks));
    setBookmarkedItems(newBookmarks);
    Toast.show({
      type: "success",
      text1: "Art Tool Saved Successfully",
      position: "top",
    });
  };

  const removeBookmark = async (id: string) => {
    const newBookmarks = bookmarkedItems.filter((item) => item !== id);
    await AsyncStorage.setItem("bookmark", JSON.stringify(newBookmarks));
    setBookmarkedItems(newBookmarks);
    Toast.show({
      type: "success",
      text1: "Art Tool Unsaved Successfully.",
      position: "top",
    });
  };

  const displayedNewsList = showAll ? newsList : newsList.slice(0, 5);

  return (
    <View style={styles.container}>
      {newsList.length === 0 ? (
        <Loading size="large" />
      ) : (
        displayedNewsList.map((item) => (
          <Link href={`/news/${item._id}` as const} asChild key={item._id}>
            <TouchableOpacity>
              <NewsItem
                item={item}
                isBookmarked={bookmarkedItems.includes(item._id)}
                saveBookmark={saveBookmark}
                removeBookmark={removeBookmark}
              />
            </TouchableOpacity>
          </Link>
        ))
      )}
      {newsList.length > 5 && !showAll && (
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

export default NewsList;

const NewsItem = ({
  item,
  isBookmarked,
  saveBookmark,
  removeBookmark,
}: {
  item: TProductResponse;
  isBookmarked: boolean;
  saveBookmark: (id: string) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
}) => {
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
      <TouchableOpacity
        onPress={() =>
          isBookmarked ? removeBookmark(item._id) : saveBookmark(item._id)
        }
      >
        <Ionicons
          name={isBookmarked ? "heart" : "heart-outline"}
          size={22}
          color={isBookmarked ? "red" : Colors.black}
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
