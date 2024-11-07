// KoiBlogList.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import axios from "axios";

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

  // Fetch blogs từ MockAPI khi component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://67207d30e7a5792f0531a995.mockapi.io/api/blog/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const renderBlogItem = ({ item }: { item: Blog }) => (

    <TouchableOpacity
      style={styles.blogItem}
      onPress={() =>
        router.push(`/blog/${item.id}`)
      }
    >
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text style={styles.blogDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={blogs}
      renderItem={renderBlogItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
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
});


export default KoiBlogList;
