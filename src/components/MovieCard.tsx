import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Movie} from '../interfaces/movieInterface';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

export const MovieCard = ({movie, height = 420, width = 300}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={ () => navigation.navigate('DetailScreen', movie)}
      activeOpacity={0.9}
      style={{
        width,
        height,
        marginHorizontal: 2,
        paddingBottom: 20,
        paddingHorizontal: 7

      }}>
      <View style={styles.imagContainer}>
        <Image source={{uri}} style={styles.img} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 18,
  },
  imagContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7,

    elevation: 9,
  },
});
