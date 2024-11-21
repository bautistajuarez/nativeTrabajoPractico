import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Users from '../screens/Users'
import NewPost from '../screens/NewPost'

const Tab = createBottomTabNavigator();

export default class HomeMenu extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Profile" component={Profile} />
                    <Tab.Screen name="Users" component={Users} />
                    <Tab.Screen name="NewPost" component={NewPost} />

                </Tab.Navigator>
            </NavigationContainer>


        )
    }
}
