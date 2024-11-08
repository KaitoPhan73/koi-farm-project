import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

interface Blog {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Đường dẫn đến hình ảnh
  author: string; // Tên tác giả
  publishedDate: string; // Ngày xuất bản
  tags: string[]; // Danh sách thẻ
}

const KoiBlogList: React.FC = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading

  // Fetch blogs từ MockAPI khi component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://67207d30e7a5792f0531a995.mockapi.io/api/blog/blogs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const renderBlogItem = ({ item }: { item: Blog }) => (
    <TouchableOpacity
      style={styles.blogItem}
      onPress={() => router.push(`/blog/${item.id}`)}
    >
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text
        style={styles.blogDescription}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={blogs}
        renderItem={renderBlogItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8', // nền sáng hơn
  },
  blogItem: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0', // đường viền nhẹ để tạo điểm nhấn
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333', // màu tối vừa cho tiêu đề
    marginBottom: 8,
  },
  blogDescription: {
    fontSize: 16,
    color: '#666', // màu xám nhẹ cho phần mô tả
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8', // Nền giống như phần nội dung
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333', // Màu cho văn bản loading
  },
});

export default KoiBlogList;
