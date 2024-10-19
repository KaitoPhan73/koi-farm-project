import React from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";
import { useFavorites } from "@/hooks/useFavorite";
import { toolResponse } from "@/schema/tool.schema";
import Toast from "react-native-toast-message";

type Props = {
  item: toolResponse;
};

const BtnFavorite = ({ item }: Props) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(item.id);

  const showToast = () => {
    Toast.show({
      type: !favorited ? "success" : "info",
      text1: !favorited
        ? `Added ${item.artName} to Favorite`
        : `Removed ${item.artName} from Favorite`,
    });
  };

  const handleFavoritePress = () => {
    if (favorited) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
    showToast();
  };

  return (
    <TouchableOpacity
      className="absolute z-10 top-[152] right-2 border-2 rounded-full p-1 border-white"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={{
        backgroundColor: favorited ? "red" : Colors.primaryColor,
      }}
      onPress={handleFavoritePress}
    >
      <Feather name="bookmark" size={24} color={Colors.white} />
    </TouchableOpacity>
  );
};

export default BtnFavorite;
