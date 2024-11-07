import { createStackNavigator } from "@react-navigation/stack";  
import { Tabs } from "expo-router";  
import DetailScreen from "@/app/products/[id]";  
import { NavigationContainer } from "@react-navigation/native";
import ProductDetails from "@/app/products/[id]";
import Checkout from "@/app/products/checkout";

const Stack = createStackNavigator();

const Stacks = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductDetails">
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
