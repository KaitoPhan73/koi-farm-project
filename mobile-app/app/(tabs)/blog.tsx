// KoiBlogList.tsx
import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

interface Blog {
  id: string;
  title: string;
  description: string;
}

// Định nghĩa kiểu cho các tham số của BlogDetail
type BlogDetailParams = {
  title: string;
  description: string;
};

// Định nghĩa kiểu cho navigation
type NavigationProps = StackNavigationProp<{
  blog: undefined;
  blogDetail: BlogDetailParams;
}>;

const KoiBlogList: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const blogs: Blog[] = [
    {
      id: '1',
      title: 'Lịch Sử Cá Koi: Từ Nhật Bản Đến Thế Giới',
      description: 'Khám phá nguồn gốc và lịch sử phát triển của cá Koi từ Nhật Bản và cách chúng trở thành một biểu tượng toàn cầu.',
    },
    {
      id: '2',
      title: 'Cách Chăm Sóc Cá Koi Tại Nhà',
      description: 'Hướng dẫn từng bước để chăm sóc cá Koi, bao gồm chế độ ăn uống, điều kiện nước và sức khỏe của chúng.',
    },
    {
      id: '3',
      title: 'Các Loại Cá Koi Phổ Biến',
      description: 'Tìm hiểu về các giống cá Koi phổ biến nhất, đặc điểm và giá trị của từng loại.',
    },
    {
      id: '4',
      title: 'Cá Koi và Văn Hóa Nhật Bản',
      description: 'Sự kết nối giữa cá Koi và văn hóa Nhật Bản, bao gồm ý nghĩa phong thủy và nghệ thuật.',
    },
    {
      id: '5',
      title: 'Cách Thiết Kế Hồ Cá Koi Hoàn Hảo',
      description: 'Hướng dẫn cách thiết kế hồ cá Koi đẹp và bền vững cho không gian sống của bạn.',
    },
  ];

  const renderBlogItem = ({ item }: { item: Blog }) => (
    <TouchableOpacity
      style={styles.blogItem}
      onPress={() => navigation.navigate("blogDetail", { title: item.title, description: item.description })}
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
  },
  blogItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  blogDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default KoiBlogList;
