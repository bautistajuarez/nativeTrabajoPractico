import React, { Component } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Users from '../screens/Users'
import NewPost from '../screens/NewPost'

import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default class HomeMenu extends Component {
    render() {
        return (
            <Tab.Navigator>
            <Tab.Screen 
              name="Home" 
              component={Home}  
              options={{ 
                headerShown: false,
                tabBarIcon: () => (
                  <Ionicons name="home" size={25}  />
                )
              }} 
            />
            <Tab.Screen 
              name="Profile" 
              component={Profile}  
              options={{ 
                headerShown: false,
                tabBarIcon: () => (
                  <Ionicons name="person" size={25}  />
                )
              }} 
            />
            <Tab.Screen 
              name="Users" 
              component={Users}  
              options={{ 
                headerShown: false,
                tabBarIcon: () => (
                  <Ionicons name="people" size={25}  />
                )
              }} 
            />
            <Tab.Screen 
              name="NewPost" 
              component={NewPost}  
              options={{ 
                headerShown: false,
                tabBarIcon: () => (
                  <Ionicons name="create" size={25}  />
                )
              }} 
            />
          </Tab.Navigator>
          
        )
    }
}
