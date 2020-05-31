// Components/FilmDetail.js

import React from 'react'
import {TouchableOpacity, Share, StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import {Icon} from 'react-native-elements'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import {connect} from 'react-redux'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  componentDidUpdate(){
    var name = ""
    var size = 30
    if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) === -1){
      name = "favorite-border"
    }else{
      name = 'favorite'
      size = 60
    }
      return (
          <Icon
            name={name} size={size} />
      )

    }

  _toggleFavorite(){
    const action = {type:'TOGGLE_FAVORITE', value:this.state.film }
    this.props.dispatch(action)

  }

  _shareFilm() {
    const  film  = this.state.film
    Share.share({ title: film.title, message: film.overview })
  }

  _displayFloatingActionButton() {
    const  film  = this.state.film
    if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Icon
            name = "share" size = {50} />
        </TouchableOpacity>
      )
    }
}

  _displayFilm() {
    const  film  = this.state.film
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity onPress={() => this._toggleFavorite()}>
            {this.componentDidUpdate()}
          </ TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }

  render() {
    console.log(this.props);

    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingActionButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  share_touchable_floatingactionbutton: {
  position: 'absolute',
  width: 60,
  height: 60,
  right: 30,
  bottom: 30,
  borderRadius: 30,
  backgroundColor: '#e91e63',
  justifyContent: 'center',
  alignItems: 'center'
},
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})

const mapStateToProps = (state) => {
  return {
      favoritesFilm : state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)
