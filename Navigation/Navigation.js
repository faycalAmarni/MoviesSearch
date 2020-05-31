// Navigation/Navigation.js
import * as React from 'react';

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppNavigator = () => {
 return (
   <Stack.Navigator>
     <Stack.Screen options={{ title: 'Rechercher' }} name="Search" component={Search} />
     <Stack.Screen options={{ title: 'Details' }} name="FilmDetail" component={FilmDetail} />
    </Stack.Navigator>
 );
}

export default AppNavigator;
