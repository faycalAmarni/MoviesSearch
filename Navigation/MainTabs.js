import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../Components/Search'
import Favorites from '../Components/Favorites'
import FilmDetail from '../Components/FilmDetail'
import Animation from '../Components/Animation'
import AppNavigator from './Navigation'
import { createStackNavigator } from '@react-navigation/stack';

const AccStack = createStackNavigator();

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
     <Tab.Screen
            name='Search'
            component={AppNavigator}
            options={{
                      tabBarLabel: 'Home',
                      tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                  ),
                }}
            />
     <Tab.Screen
          name='Favorites'
          component={Favorites}
          options={{
                    tabBarLabel: 'Favorites ',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="heart" color={color} size={size} />
                ),
              }}
           />
    </Tab.Navigator>
  );
}

export default MainTabs;
