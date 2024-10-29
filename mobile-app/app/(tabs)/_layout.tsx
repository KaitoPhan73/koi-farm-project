import { Tabs } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "@/constants/Colors";
import TabBar from "@/components/tab-bar";
export default function TabLayout() {
  return (
    <Tabs
    // tabBar={(props) => <TabBar {...props} />}
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
          title: "Home Page",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          headerShown: true,
          title: "Product",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <AntDesign name="info" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="deposit"
        options={{
          headerShown: true,
          title: "Deposit",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <AntDesign name="form" size={24} color={color} />
          ),
        }}
      />


      <Tabs.Screen
        name="blog"
        options={{
          title: "Blog",
          headerTitleAlign: "center",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="new-label" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="BlogDetail"
        options={{
          title: "Blog Details",
          headerTitleAlign: "center",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="new-label" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "Profile",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
