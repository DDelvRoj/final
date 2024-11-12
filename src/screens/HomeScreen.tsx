import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Button, Dimensions, ScrollView, View, StyleSheet, } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../hooks/useMovies';
import { LogBox } from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColoresHelper';
import { GradientContext } from '../context/GradientContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigation';
LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  'NativeBase: The contrast ratio of',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const { width: windowWidth } = Dimensions.get('window');

type HomeScreenProp = StackNavigationProp<RootStackParams, 'HomeScreen'>;

const HomeScreen = () => {
  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  const { setMainColors } = useContext(GradientContext);
  const navigation = useNavigation<HomeScreenProp>();

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    setMainColors({ primary, secondary });
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{ marginTop: top + 20 }}>
          {/* Logout Button */}
          <View style={styles.logoutButtonContainer}>
            <Button title="Logout" onPress={handleLogout} />
          </View>

          {/* Main Carousel */}
          <View style={{ height: 440 }}>
          <Carousel
              data={nowPlaying}
              renderItem={({ item }: any) => <MovieCard movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
          {/* Popular Movies */}
          <HorizontalSlider title="Popular" movies={popular} />
          {/* Top Rated Movies */}
          <HorizontalSlider title="Top Rated" movies={topRated} />
          {/* Upcoming Movies */}
          <HorizontalSlider title="Up coming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  logoutButtonContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
  },
});
export default HomeScreen;