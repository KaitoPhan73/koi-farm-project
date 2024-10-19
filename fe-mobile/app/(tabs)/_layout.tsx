import { Tabs } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "@/constants/Colors";
import TabBar from "@/components/tab-bar";
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      // screenOptions={{
      //   tabBarStyle: {
      //     backgroundColor: Colors.bgColor,
      //     borderTopWidth: 0,
      //     padding: 0,
      //   },
      //   tabBarShowLabel: false,
      //   tabBarActiveTintColor: Colors.black,
      //   tabBarInactiveTintColor: "#999",
      // }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Home",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          headerTitleAlign: "center",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-border" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
