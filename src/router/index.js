import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Edit, Home, Input } from '../screens';


const Stack = createNativeStackNavigator();

const Router =  () => {
    return <Stack.Navigator>
    <Stack.Screen name="Halaman Utama" component={Home} options={{headerShown: false}}/>
    <Stack.Screen name="Tambah Data" component={Input} options={{headerShown: false}}/>
    <Stack.Screen name="Edit Data" component={Edit} options={{headerShown: false}}/>
  </Stack.Navigator>;
};

const styles = StyleSheet.create({});

export default Router;
