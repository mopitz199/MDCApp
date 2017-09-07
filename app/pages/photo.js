/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

// Style
//import { styles } from '../styles/photo';

// Npm packages
import { StackNavigator, NavigationActions } from 'react-navigation';
import PhotoView from 'react-native-photo-view';

// Npm packages
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Import the custom theme
import * as theme from '../styles/theme';

export default class Photo extends Component {

  constructor(props){
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;
    console.warn(params.url)
    return (
      <PhotoView
      source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
      minimumZoomScale={0.5}
      maximumZoomScale={3}
      androidScaleType="center"
      onLoad={() => console.log("Image loaded!")}
      style={{width: 300, height: 300}} />
    );
  }

}
