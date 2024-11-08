import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

interface Blog {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
  tags: string[];
}

const KoiBlogList: React.FC = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [displayedBlogsCount, setDisplayedBlogsCount] = useState<number>(5); // Set to 5 to display 5 blogs initially

  // Fetch blogs from MockAPI when the component mounts
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

  // Handle the "See More" / "See Less" button click
  const handleToggle = () => {
    if (displayedBlogsCount < blogs.length) {
      setDisplayedBlogsCount(blogs.length); // Show all blogs
    } else {
      setDisplayedBlogsCount(5); // Show 5 blogs initially
    }
  };

  // Get the blogs that are currently displayed based on the count
  const displayedBlogs = blogs.slice(0, displayedBlogsCount);

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
        data={displayedBlogs}
        renderItem={renderBlogItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        ListFooterComponent={
          <TouchableOpacity style={styles.seeMoreButton} onPress={handleToggle}>
            <Text style={styles.seeMoreText}>
              {displayedBlogsCount < blogs.length ? "See More" : "See Less"}
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8',
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
    borderColor: '#e0e0e0',
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  blogDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  seeMoreButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFA500',
    borderRadius: 8,
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default KoiBlogList;
