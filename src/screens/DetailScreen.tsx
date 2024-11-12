import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParams} from '../navigator/Navigation';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {MovieDetails} from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const {isLoading, cast, movieFull} = useMovieDetails(movie.id);

  console.log(isLoading);
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{uri}} style={styles.cardImage} />
        </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={35} style={{marginTop: 20}} />
      ) : (
        <MovieDetails movieFull={movieFull!} cast={cast} />
      )}

      {/* botton para regresar */}
      <View style={styles.backBottom}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon color="white" name="arrow-back-outline" size={50} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    //backgroundColor: 'red',
    //overflow: 'hidden',
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  cardImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    color: 'black',
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  backBottom: {
    position: 'absolute',
    top: 10,
    left: 5,
    zIndex: 999,
    elevation: 9,
  },
});
