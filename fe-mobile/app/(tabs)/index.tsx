import React from "react";
import { ScrollView, View } from "react-native";
import ArtToolsList from "@/components/art-tools-list";
import BrandsList from "@/components/brands-list";
import SearchTool from "@/components/search-tool";

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SearchTool />
      <BrandsList />

      <ArtToolsList />
    </ScrollView>
  );
}
