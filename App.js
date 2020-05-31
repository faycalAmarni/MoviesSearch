import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import Favorites from './Components/Favorites'
import Search from './Components/Search'
import FilmDetail from './Components/FilmDetail'
import {Provider} from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import Store from './Store/configureStore'
import LinearGradient from 'expo-linear-gradient';
import AppNavigator from './Navigation/Navigation';
import MainTabs from "./Navigation/MainTabs"
const Stack = createStackNavigator();

export default class App extends React.Component {
render() {
    return (

      <Provider store={Store}>
          <NavigationContainer >
            <MainTabs />
          </NavigationContainer>
      </Provider>


    )
  }
}
