// Components/FilmItem.js
//2ab4d2cd2570168fe8a0ece49de53e05
import React from 'react'
import { Image, Input, Icon } from 'react-native-elements'
import { Animated, Dimensions, StyleSheet, View, Text, TouchableOpacity  } from 'react-native'
import {getImageFromApi} from '../API/TMDBApi'

class FilmItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      positionLeft: new Animated.Value(Dimensions.get('window').width)
    }
  }

  componentDidMount() {
    Animated.spring(
      this.state.positionLeft,
      {
        toValue: 0,
        speed : 1
      }
    ).start()
  }


  _displayFavoriteImage() {
   if (this.props.isFilmFavorite) {
     // Si la props isFilmFavorite vaut true, on affiche le 🖤
     return (
       <Icon
         name={'favorite'} size={20} />

     )
   }
 }



  render() {
    const {film, displayDetailForFilm} = this.props
    return (

      <Animated.View  style={{ left: this.state.positionLeft }}>
        <TouchableOpacity
            style={styles.main_container}
            onPress={() => displayDetailForFilm(film.id)}
        >
            <Image
              style={styles.image}
              source={{uri: getImageFromApi(film.poster_path)}}
            />
           <View style={styles.content_container}>
              <View style= {styles.header_container}>
                {this._displayFavoriteImage()}
                <Text style={styles.title_text}>{film.title}</Text>
                <Text style={styles.vote_text}>{film.vote_average}</Text>
              </View>
              <View style={styles.description_container} >
                  <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
              </View>
              <View style={styles.date_container}>
                    <Text style={styles.date_text}>Sortie le {film.release_date}</Text>
              </View>

           </View>
        </TouchableOpacity>
      </ Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex :1,
    height: 190,
    flexDirection : 'row',
    paddingLeft : 5,
    paddingRight : 5
  },
  image: {
   width: 120,
   height: 180,
   margin: 5,
   //backgroundColor: 'gray'
 },
  content_container: {
      flex : 1,
      margin : 5
  },
  header_container: {
    flex : 3,
     flexDirection:'row'
  },
  title_text: {
      fontWeight : 'bold',
      fontSize : 20,
      paddingRight : 5,
      flex : 1,
      flexWrap : 'wrap'
  },
  vote_text: {
      fontWeight : 'bold',
      fontSize : 26,
      color: '#666666'
  },
  description_container : {
      flex : 7
  },
  description_text : {
      fontStyle : 'italic',
      color: '#666666'
  },
  date_container : {
    flex : 1
  },
  date_text : {
    textAlign : 'right',
    fontSize : 14
  }
})

export default FilmItem
