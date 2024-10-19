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
import { styled } from "nativewind";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import BtnFavorite from "./btn-favorite";
import { koiResponse } from "@/schema/tool.schema";

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
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-100">
        <StyledText className="text-xl text-red-500">Not Found</StyledText>
      </StyledView>
    );
  }

  const renderItem = ({ item }: { item: koiResponse }) => (
    <StyledPressable
      className="bg-blue-100 rounded-[20px] overflow-hidden p-2 shadow-md"
      style={{ width: itemWidth }}
      onPress={() => router.push(`/art-tools/${item._id}`)}
    >
      <StyledView className="relative">
        {/* <Badge value={item.screeningRate / 100} /> */}
        <Image
          source={{ uri: item.imageUrl }}
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
          {item.name}
        </StyledText>
        <StyledText className="text-gray-600 text-sm">
          Origin: {item.origin}
        </StyledText>
        <StyledText className="text-gray-600 text-sm">
          Age: {item.age} years
        </StyledText>
        <StyledText className="text-gray-600 text-sm">
          Size: {item.size} cm
        </StyledText>

        {item.age > 0 ? (
          <StyledView className="flex-row items-center justify-end mt-1">
            <StyledText className="text-sm line-through text-gray-500">
              ${item.price}
            </StyledText>
            <StyledText className="ml-1 text-md font-semibold text-red-500 mr-2">
              - ${item.price - (item.price * item.price) / 100}
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
        keyExtractor={(item) => item._id}
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
