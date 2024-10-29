import React from "react";
import { ScrollView, View, Text } from "react-native";
import ArtToolsList from "@/components/products-list";
import BrandsList from "@/components/brands-list";
import SearchTool from "@/components/search-tool";

export default function HomeScreen() {
    return (
        <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            <View>
                <Text> this is profike</Text>

            </View>
        </ScrollView>
    );
}
