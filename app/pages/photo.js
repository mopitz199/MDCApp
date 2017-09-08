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
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import Dimensions from 'Dimensions';

// Style
import { styles } from '../styles/photo';

// Npm packages
import { StackNavigator, NavigationActions } from 'react-navigation';

// Npm packages
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Import the custom theme
import * as theme from '../styles/theme';

import Image from 'react-native-transformable-image';
import Orientation from 'react-native-orientation';

export default class Photo extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white'
  });

  constructor(props){
    super(props);
    this.state = {
      visible: true,
      width: Dimensions.get('window').width,
    }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
    this.setState({visible:false})
  }

  _orientationDidChange = (orientation) => {
    this.setState({width: Dimensions.get('window').width})
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Image
        style={styles.photo}
        source={{uri: params.url}}
      />
    );
  }

}
