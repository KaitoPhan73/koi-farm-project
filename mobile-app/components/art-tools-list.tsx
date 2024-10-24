import React from "react";
import {
  ActivityIndicator,
  Image,
  FlatList,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useTools } from "@/hooks/useTools";
import { toolResponse } from "@/schema/tool.schema";
import { styled } from "nativewind";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import BtnFavorite from "./btn-favorite";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Badge = ({ value }: { value: number }) => {
  if (value <= 0) return null;

  return (
    <StyledView className="absolute z-10 top-2 left-2 bg-red-600 rounded-lg px-2 py-1">
      <StyledText className="text-white font-bold text-xs">
        {`${(value * 100).toFixed(0)}% OFF`}
      </StyledText>
    </StyledView>
  );
};

const ArtToolsList = () => {
  const { brand, artName } = useLocalSearchParams();
  const brandQuery = Array.isArray(brand) ? brand[0] : brand;
  const artNameQuery = Array.isArray(artName) ? artName[0] : artName;
  const { getTools } = useTools(brandQuery, artNameQuery);
  const { width } = useWindowDimensions();
  const { isLoading, isError, data, error } = getTools;
  const router = useRouter();
  const numColumns = 2;
  const gap = 12;

  const outerPadding = 16;
  const itemWidth =
    (width - (numColumns - 1) * gap - 2 * outerPadding - 4 * numColumns) /
    numColumns;

  if (isLoading) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <StyledText className="mt-4 text-gray-500">Loading...</StyledText>
      </StyledView>
    );
  }

  if (isError) {
    if (isError) {
      return (
        <StyledView className="flex-1 justify-center items-center bg-gray-100">
          <StyledText className="text-xl text-red-500">Not Found</StyledText>
        </StyledView>
      );
    } else {
      console.log("Có lỗi xảy ra khi fetch dữ liệu.", error);
    }
  }

  const renderItem = ({ item }: { item: toolResponse }) => (
    <StyledPressable
      className="bg-blue-100 rounded-[20px] overflow-hidden p-2 shadow-md"
      style={{ width: itemWidth }}
      onPress={() => router.push(`/art-tools/${item.id}`)}
    >
      <StyledView className="relative">
        <Badge value={item.limitedTimeDeal} />
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: itemWidth }}
          className="object-cover rounded-xl"
        />
        <StyledView className="absolute top-0 right-0">
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
            }}
          >
            <BtnFavorite item={item} />
          </Pressable>
        </StyledView>
      </StyledView>
      <StyledView className="flex-1 justify-between mt-4">
        <StyledText
          className="text-gray-800 font-semibold"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.artName}
        </StyledText>

        {item.limitedTimeDeal > 0 ? (
          <StyledView className="flex-row items-center justify-end mt-1">
            <StyledText className="text-sm line-through text-gray-500">
              ${item.price}
            </StyledText>
            <StyledText className="ml-1 text-md font-semibold text-red-500 mr-2">
              - ${item.price - (item.price * item.limitedTimeDeal) / 100}
            </StyledText>
          </StyledView>
        ) : (
          <StyledText className="text-md font-semibold mt-1 text-yellow-500 self-end">
            ${item.price}
          </StyledText>
        )}
      </StyledView>
    </StyledPressable>
  );

  return (
    <ScrollView>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={{ gap, paddingVertical: outerPadding }}
        columnWrapperStyle={{ gap }}
        className="w-full bg-gray-100 pb-20"
        style={{ paddingHorizontal: outerPadding }}
      />
    </ScrollView>
  );
};

export default ArtToolsList;
