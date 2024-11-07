import { createStackNavigator } from "@react-navigation/stack";  
import { Tabs } from "expo-router";  
import DetailScreen from "@/app/art-tools/[id]";  

const Stack = createStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Tabs}
        options={{ headerShown: false }}  
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detail' }}  
      />
    </Stack.Navigator>
  );
};

export default Stacks;
