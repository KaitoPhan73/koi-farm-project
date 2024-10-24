import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useFavorites } from "@/hooks/useFavorite";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { toolResponse } from "@/schema/tool.schema";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const FavoritesList = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const router = useRouter();

  const showToastDeleted = (item: toolResponse) => {
    Toast.show({
      type: "info",
      text1: `Removed ${item.artName} from Favorite`,
    });
  };

  const handleLongPress = (item: toolResponse) => {
    Alert.alert(
      "Confirm Delete",
      "Do you wanna remove it?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            removeFavorite(item.id); // Gọi hàm xóa
            showToastDeleted(item); // Hiển thị toast sau khi xóa
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: toolResponse }) => (
    <TouchableOpacity
      onPress={() => router.push(`/art-tools/${item.id}`)}
      onLongPress={() => handleLongPress(item)} // Sử dụng hàm handleLongPress
      className="flex-row items-center bg-white rounded-lg shadow-md p-4 mb-4 gap-1"
    >
      <Image
        source={{ uri: item.image }}
        className="w-20 h-20 rounded-md mr-4"
      />
      <View className="flex-1">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-lg font-bold text-gray-800"
        >
          {item.artName}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-sm text-gray-600 mt-1"
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      {favorites.length > 0 ? (
        <View className="pb-24">
          <FlatList
            data={favorites}
            scrollEnabled={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            className="m-4 "
          />
          <TouchableOpacity
            onPress={clearFavorites}
            className="bg-red-500 py-3 px-6 rounded-full self-center mb-4"
          >
            <Text className="text-white font-bold text-lg">
              Clear All Favorites
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="h-[80vh] justify-center items-center">
          <Feather name="heart" size={64} color={Colors.primaryColor} />
          <Text className="text-xl text-gray-600 mt-4">No favorites yet</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default FavoritesList;
