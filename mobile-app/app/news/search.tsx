import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import axios from 'axios';

export interface ArtTool {
  id: string;
  artName: string;
  price: number;
  description: string;
  glassSurface: boolean;
  image: string;
  brand: string;
  limitedTimeDeal: number;
  comments?: Array<{ id: string; name: string; rating: number; comment: string; createdAt: string }>;
}

const ArtToolSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [artTools, setArtTools] = useState<ArtTool[]>([]); 
  const [filteredTools, setFilteredTools] = useState<ArtTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtTools = async () => {
    try {
      const response = await axios.get(`${process.env.ARTTOOL_APP_API_URL}`);
      setArtTools(response.data);
      setFilteredTools(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching art tools:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (artTools.length > 0) { 
      const results = artTools.filter(tool =>
        tool.artName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTools(results);
    }
  }, [searchTerm, artTools]);

  useEffect(() => {
    fetchArtTools();
  }, []);

  const renderArtTool = ({ item }: { item: ArtTool }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.artName}>{item.artName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for art tools..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={filteredTools}
          keyExtractor={(item) => item.id}
          renderItem={renderArtTool}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  artName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#666',
  },
  price: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ArtToolSearch;



