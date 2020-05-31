import React from 'react'
import {Easing, Animated, StyleSheet, Text, View, TextInput,  FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { Card, ListItem, Button, Icon, Input, SearchBar  } from 'react-native-elements'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'
import {LinearGradient} from 'expo-linear-gradient';
import {Favorites} from './Favorites'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


class Search extends React.Component {

  constructor(props) {
     super(props)
     //this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
     this.page = 0
     this.totalPages = 0
     this.state = {
       searchedText : "",
       films: [],
       isLoading : false,
     }
     this._loadFilms = this._loadFilms.bind(this)
   }

   updateSearch = searchedText => {
    this.setState({ searchedText });
  };

   _loadFilms() {
       if (this.state.searchedText.length > 0) {
         this.setState({ isLoading: true })
         getFilmsFromApiWithSearchedText(this.state.searchedText, this.page+1).then(data => {
             this.page = data.page
             this.totalPages = data.total_pages
             this.setState({
               films: [ ...this.state.films, ...data.results ],
               isLoading: false
             })
         })
       }
   }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _searchFilms() {
   this.page = 0
   this.totalPages = 0
   this.setState({
     films: [],
   }, () => {
       this._loadFilms()
   })
 }

 _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", {idfilm: idFilm})
  }


    _isFavorite(film){
    var bool = false
    if (this.props.favoritesFilm.findIndex(item => item.id === film.id) !== -1){
      bool = true
    }

    return bool
  }

  // _displayLoading() {
  //    if (this.state.isLoading) {
  //      return (
  //        <View style={styles.loading_container}>
  //          <ActivityIndicator size='large' />
  //          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
  //        </View>
  //      )
  //    }
  //  }

  render() {
    return(

      <LinearGradient colors={['#778899', '#b0c4de']} style={styles.mainContainer}>

          <View style={{flex:1 }}>


            <SearchBar
               placeholder="Type Here..."
               style = {{margin : 5}}
               onChangeText={this.updateSearch}
               onSubmitEditing={() => this._searchFilms()}
               value={this.state.searchedText}
             />


             <FilmList
              films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
              navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
              loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
              page={this.page}
              totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
            />

            {this.state.isLoading ?
              <View style={styles.loading_container}>
                <ActivityIndicator size='large' />
              </View>
              : null
            }



          </View>

       </LinearGradient>
    )
  }
}


const styles = StyleSheet.create({

  mainContainer: {
    flex : 1,

  },
  textinput : {
     borderColor: '#000400',
     borderWidth: 1,
     paddingLeft: 5
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: 'center'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = (state) =>  {
  return {
    favoritesFilm : state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search)
