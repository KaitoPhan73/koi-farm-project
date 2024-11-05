import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { router, Stack, useLocalSearchParams } from "expo-router";
import Loading from "@/components/Loading";
import { Ionicons } from "@expo/vector-icons";

// Định nghĩa kiểu cho blog
interface Blog {
    id: string;
    title: string;
    description: string;
    imageUrl: string; // Đường dẫn đến hình ảnh
    author: string; // Tên tác giả
    publishedDate: string; // Ngày xuất bản
    tags: string[]; // Danh sách thẻ
}


const BlogDetail: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>(); // Lấy id từ params
    const [blog, setBlog] = useState<Blog | null>(null); // Sử dụng kiểu Blog
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`https://67207d30e7a5792f0531a995.mockapi.io/api/blog/blogs/${id}`);
                setBlog(response.data);
            } catch (err) {
                setError("Error fetching blog details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetails();
    }, [id]); // Chỉ fetch lại khi id thay đổi

    // Hiển thị ActivityIndicator khi đang tải dữ liệu
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Hiển thị thông báo lỗi nếu có lỗi
    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    // Kiểm tra nếu không tìm thấy blog
    if (!blog) {
        return <Text>No blog found.</Text>;
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={22} />
                        </TouchableOpacity>
                    ),

                    title: "",
                }}
            />

            <ScrollView
                contentContainerStyle={styles.container}
                style={styles.container}
            >
                <View style={styles.container}>
                    <Image source={{ uri: blog.imageUrl }} style={styles.blogImage} />
                    <Text style={styles.title}>{blog.title}</Text>
                    <Text style={styles.blogAuthor}>By {blog.author}</Text>
                    <Text style={styles.blogDate}>{new Date(blog.publishedDate).toLocaleDateString()}</Text>
                    <Text style={styles.description}>{blog.description}</Text>
                    <View style={styles.tagsContainer}>
                        {blog?.tags?.map((tag) => (
                            <Text key={tag} style={styles.tag}>
                                #{tag}
                            </Text>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
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
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    blogImage: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 10,
    },
    blogAuthor: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    blogDate: {
        fontSize: 12,
        color: '#999',
        marginBottom: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    tag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        padding: 5,
        marginRight: 5,
        fontSize: 12,
    },
});

export default BlogDetail;