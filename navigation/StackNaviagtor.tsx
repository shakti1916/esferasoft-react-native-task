import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import AddTaskScreen from '../screens/AddTaskScreen';


const StackNaviagtior = () => {
    const Stack = createNativeStackNavigator();

    const Tab = createBottomTabNavigator();

    const BottomTab = () => {
      return (
        <Tab.Navigator>
          <Tab.Screen name='Dashboard' component={DashboardScreen} options={{tabBarLabel:"Home", tabBarLabelStyle:{color:"#008e97"},headerShown:false,tabBarIcon:({focused})=> focused ? (
             <MaterialCommunityIcons name="home" size={24} color="blue"  />

          ):(
            <MaterialCommunityIcons name="home-outline" size={24} color="black"  />

          )}}/>
         
          <Tab.Screen name='Add Task' component={AddTaskScreen} options={{tabBarLabel:"Add Task", tabBarLabelStyle:{color:"#008e97"},headerShown:false,tabBarIcon:({focused})=> focused ? (
             <MaterialCommunityIcons name="plus" size={24} color="blue"  />

          ):(
            <MaterialCommunityIcons name="plus" size={24} color="black"  />

          )}}/>
           <Tab.Screen name='profile' component={DashboardScreen} options={{tabBarLabel:"user", tabBarLabelStyle:{color:"#008e97"},headerShown:false,tabBarIcon:({focused})=> focused ? (
             <MaterialCommunityIcons name="account" size={24} color="blue"  />

          ):(
            <MaterialCommunityIcons name="account" size={24} color="black"  />

          )}}/>
        </Tab.Navigator>
      )

    }


  return (
    <NavigationContainer>
    <Stack.Navigator>
     
      <Stack.Screen name="Main" component={BottomTab} options={{headerShown:false}} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackNaviagtior