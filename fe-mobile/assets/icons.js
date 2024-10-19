import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

export const icons = {
  index: (props) => <AntDesign name="home" size={26} {...props} />,
  favorite: (props) => (
    <MaterialIcons name="favorite-border" size={26} {...props} />
  ),
};
