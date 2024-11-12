// src/screens/RegisterScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigation';
import auth from '@react-native-firebase/auth';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
 if(email && password){
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert('Registro exitoso', 'Usuario registrado correctamente',[
        {
          text:'Ir al Login',
          onPress: ()=>navigation.replace('LoginScreen')
        }
      ]);
      //navigation.replace('LoginScreen');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'El email ya está registrado');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'El email es invalido');
      }

      console.error(error);
    });
  } else {
    Alert.alert('Error', 'Por favor completa todos los campos');
  }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.label}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=> navigation.replace('LoginScreen')}>
        <Text style={styles.label}>Volver a Iniciar Sesión</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black'
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    textAlign:'center',
    margin:8
  },
  button:{
    alignContent:'center',
    backgroundColor:'green',
    margin:10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  forgotPasswordText: {
    marginTop: 15,
    color: 'white',
    textAlign: 'center',
  },
});