import Colors from "@/constants/Colors";
import { useFavorites } from "@/hooks/useFavorite";
import { useTools } from "@/hooks/useTools";
import { toolResponse } from "@/schema/tool.schema";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const CommentScreen = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const { id } = useLocalSearchParams();
  const { getTool } = useTools();
  const comments = getTool(Array.isArray(id) ? id[0] : id).data?.comments || [];

  // Hàm render cho mỗi item trong FlatList
  const renderItem = ({ item }: { item: toolResponse["comments"][0] }) => (
    <View className="p-4 bg-white rounded-lg shadow-md ">
      {item && (
        <View className="gap-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-md font-semibold text-gray-600">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <Text className="text-lg font-semibold">{item.comment}</Text>
          <View className="flex-row">
            {Array.from({ length: 5 }, (_, index) => (
              <Feather
                key={index}
                name="star"
                size={20}
                color={index < item.rating ? "gold" : "gray"}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Comments",
        }}
      />
      <ScrollView>
        {comments.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={comments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            className="m-4"
          />
        ) : (
          <View className="h-[80vh] justify-center items-center">
            <Feather
              name="message-square"
              size={64}
              color={Colors.primaryColor}
            />
            <Text className="text-xl text-gray-600 mt-4">No comments yet</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default CommentScreen;
