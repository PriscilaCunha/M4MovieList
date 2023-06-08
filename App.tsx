import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

export default function App() {

  const API_KEY = '5059743e77213cead5fc38765fc6457b';

  const [movies, setMovies] = useState(null);

  const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie'
  });

  useEffect(() => {
    async function fetchMovies() {
      try {

        const response = await api.get(`/popular/?api_key=${API_KEY}&language=pt-BR`);
        setMovies(response.data.results);

      } catch (error) {
        console.log('Error: ', error);
      }
    }
    fetchMovies();
  }, []);

  const Item = ({title, description, image}) => (
    <View style={styles.result}>
      <Text style={styles.title}>{title}</Text>
      
      <Image
        style={styles.image}
        source={{uri: image}}
      />

      <Text style={styles.itemText}>{description}</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Item title={item.title} description={item.overview} image={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
  );

  return (
    movies ?
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView> :
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
  },
  result: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});