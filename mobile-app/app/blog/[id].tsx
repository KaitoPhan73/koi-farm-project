import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BlogDetailProps {
    route: {
        params: {
            title: string;
            description: string;
        };
    };
}

const BlogDetail: React.FC<BlogDetailProps> = ({ route }) => {
    const { title, description } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
    },
});

export default BlogDetail;
