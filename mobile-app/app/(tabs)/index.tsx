import React from "react";
import { ScrollView, View, Text } from "react-native";
import ArtToolsList from "@/components/products-list";
import BrandsList from "@/components/brands-list";
import SearchTool from "@/components/search-tool";
import { TProductResponse } from "@/schema/product.schema";
import productAPI from "@/apis/product";
import { useTools } from "@/hooks/useTools";
import { useLocalSearchParams, useRouter } from "expo-router";
import Loading from "@/components/Loading";

export default function HomeScreen() {
    return (
        <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            <View>
                <Text> this is homepage</Text>

            </View>
        </ScrollView>
    );
}
