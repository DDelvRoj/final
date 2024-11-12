import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Cast} from '../interfaces/creditsInterfaces';
import {MovieFull} from '../interfaces/movieInterface';
import currencyFormatter from 'currency-formatter';
import {FlatList} from 'react-native-gesture-handler';
import {CastItem} from './CastItem';
interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: Props) => {
  return (
    <>
      {/* Detalles */}
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="star-outline" color="grey" size={16} />
          <Text style={{color: 'black'}}>{movieFull.vote_average}</Text>
          <Text style={{color: 'black', marginLeft: 5}}>
            -{movieFull.genres.map(g => g.name).join(', ')}
          </Text>
        </View>
        {/* Historia de la pelicula */}
        <Text
          style={{
            color: 'black',
            fontSize: 25,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          Historia
        </Text>

        {/* casting de la pelicula */}
        <Text style={{color: 'black', fontSize: 20}}>{movieFull.overview}</Text>
        {/* presupuesto de la pelicula */}
        <Text style={{color: 'black', fontSize: 23, marginTop: 10}}>
          Presupuesto
        </Text>
        <Text style={{color: 'black', fontSize: 18}}>
          {currencyFormatter.format(movieFull.budget, {code: 'USD'})}
        </Text>
      </View>
      <View style={{marginTop: 10, marginBottom: 100}}>
        <Text
          style={{
            color: 'black',
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Actores
        </Text>
        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10, height: 70}}
        />
        {/** */}
      </View>
    </>
  );
};
