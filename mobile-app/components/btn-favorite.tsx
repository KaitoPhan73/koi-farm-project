import React from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";
import { useFavorites } from "@/hooks/useFavorite";
import { toolResponse } from "@/schema/tool.schema";
import Toast from "react-native-toast-message";
import { TProductResponse } from "@/schema/product.schema";

type Props = {
  item: TProductResponse;
};

const BtnFavorite = ({ item }: Props) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(item._id);

  const showToast = () => {
    Toast.show({
      type: !favorited ? "success" : "info",
      text1: !favorited
        ? `Added ${item.name} to Favorite`
        : `Removed ${item.name} from Favorite`,
    });
  };

  const handleFavoritePress = () => {
    if (favorited) {
      removeFavorite(item._id);
    } else {
      addFavorite(item._id);
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
