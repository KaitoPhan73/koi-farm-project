import React from "react";
import {
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styled } from "nativewind";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useTools } from "@/hooks/useTools";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { useFavorites } from "@/hooks/useFavorite";
import Toast from "react-native-toast-message";

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { getTool } = useTools();
  const toolId = Array.isArray(id) ? id[0] : id;
  const response = getTool(toolId);
  const data = response.data;
  const router = useRouter();

  const favorited = isFavorite(toolId);

  const handleFavoritePress = () => {
    if (favorited) {
      removeFavorite(toolId);
    } else {
      addFavorite(data!);
    }
    showToast();
  };

  const showToast = () => {
    Toast.show({
      type: !favorited ? "success" : "info",
      text1: !favorited ? `Added to Favorite` : `Removed from Favorite`,
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              className="border-2 border-gray-200 bg-gray-50 rounded-lg p-1"
              onPress={() => {
                router.back();
              }}
            >
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              className={`border-2 border-gray-200 bg-gray-50 rounded-lg p-1`}
              onPress={handleFavoritePress}
              style={{
                backgroundColor: favorited ? Colors.primaryColor : Colors.white,
              }}
            >
              <Feather
                name="bookmark"
                size={24}
                color={favorited ? Colors.white : "black"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <LinearGradient colors={["#FDF0F3", "#FFFBFC"]}>
        <View className="h-80 w-full">
          <Image
            source={{ uri: data?.image }}
            className="object-cover flex w-full h-full"
          />
        </View>

        {response.isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={Colors.primaryColor} />
            <Text className="mt-4 text-gray-500">Đang tải dữ liệu...</Text>
          </View>
        ) : response.isError ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl text-red-500">Có lỗi xảy ra!</Text>
          </View>
        ) : (
          <View className="p-5">
            <View className="flex flex-row justify-between">
              <Text className="font-bold text-xl">{data?.artName}</Text>
            </View>
            <View className="flex flex-row justify-between my-4">
              <View className="flex flex-row gap-2">
                <View className="rounded-lg p-2 bg-gray-200">
                  <MaterialIcons
                    name="branding-watermark"
                    size={24}
                    color={Colors.primaryColor}
                  />
                </View>
                <View>
                  <Text className="font-semibold text-md">Brand</Text>
                  <Text className="text-md">{data?.brand}</Text>
                </View>
              </View>
              <View className="flex flex-row gap-2">
                <View className="rounded-lg p-2 bg-gray-200">
                  <Ionicons name="cube" size={24} color={Colors.primaryColor} />
                </View>
                <View>
                  <Text className="font-semibold text-md">Glass</Text>
                  <Text className="text-md">
                    {data?.glassSurface ? "Yes" : "No"}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row gap-2">
                <View className="rounded-lg p-2 bg-gray-200">
                  <MaterialCommunityIcons
                    name="sale"
                    size={24}
                    color={Colors.primaryColor}
                  />
                </View>
                <View>
                  <Text className="font-semibold text-md">Deal</Text>
                  <Text className="text-md">{`${(
                    (data?.limitedTimeDeal ?? 0) * 100
                  ).toFixed(0)}% OFF`}</Text>
                </View>
              </View>
            </View>
            {(data?.limitedTimeDeal ?? 0) > 0 ? (
              <View className="flex-row items-center mt-1">
                <Text className="font-bold text-xl line-through text-gray-500">
                  ${data?.price}
                </Text>
                <Text className="ml-1 font-bold text-xl text-red-500 mr-2">
                  - $
                  {(data?.price ?? 0) -
                    ((data?.price ?? 0) * (data?.limitedTimeDeal ?? 0)) / 100}
                </Text>
              </View>
            ) : (
              <Text className="text-md font-semibold mt-1 text-yellow-500">
                ${data?.price}
              </Text>
            )}
            <View className="my-4">
              <Text className="font-light text-lg">{data?.description}</Text>
            </View>
            <View className="p-5">
              <TouchableOpacity
                className="bg-blue-500 rounded-lg p-3"
                onPress={() =>
                  router.push({
                    pathname: "/comments",
                    params: { id: data?.id },
                  })
                }
              >
                <Text className="text-white text-center text-xl font-bold">
                  See comment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </>
  );
};

export default DetailScreen;
