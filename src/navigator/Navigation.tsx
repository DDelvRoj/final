import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { LoginScreen } from '../screens/LoginScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import  HomeScreen from '../screens/HomeScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth'
import { createNavigationContainerRef } from '@react-navigation/native';


export type RootStackParams = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  DetailScreen: Movie;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined; // Añadido
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },5000);
  },[])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
     
     
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} /> 
        
    </Stack.Navigator>
  );
};
function auth() {
  throw new Error('Function not implemented.');
}

