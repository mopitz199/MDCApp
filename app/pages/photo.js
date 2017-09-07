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

// Npm packages
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Import the custom theme
import * as theme from '../styles/theme';

export default class Photo extends Component {

  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
  }

  render() {
    return (
      <Image
        style={{width: 50, height: 50}}
        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
      />
    );
  }

}
