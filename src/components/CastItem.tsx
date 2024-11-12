import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Cast} from '../interfaces/creditsInterfaces';

interface Props {
  actor: Cast;
}

export const CastItem = ({actor}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
  return (
    <View style={styles.container}>
      {actor.profile_path && (
        <Image
          source={{uri}}
          style={{width: 50, height: 50, borderRadius: 10}}
        />
      )}

      <View style={styles.actorInfo}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
          {actor.name}
        </Text>
        <Text style={{color: 'black', fontSize: 16, opacity: 0.7}}>
          {actor.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    height: 50,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    elevation: 9,
    marginLeft: 20,
    paddingRight: 15,
  },
  actorInfo: {
    marginLeft: 20,
    marginTop: 4,
  },
});
