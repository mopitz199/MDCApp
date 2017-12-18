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
  TouchableOpacity,
  Platform
} from 'react-native';

import { Container, Header, Button, Content, ActionSheet } from "native-base";

import { NavigationActions } from 'react-navigation';

// Npm packages
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the custom theme
import * as theme from '../styles/theme';

import styles from '../styles/home-left-header.js';

const resetActionLogin = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'login'})]
});


export default class HomeLeftHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      platform: Platform.OS
    };
  }

  _showMenu = () => {
    this.props.navigation.navigate('DrawerToggle')
    //this.props._toggleMenu();
  }

  render() {
    return (
      <TouchableOpacity style={styles.showMenuButton} onPress={this._showMenu}>
        <Icon
          name="bars"
          size={30}
          color={theme.secondaryTextColor}
        />
      </TouchableOpacity>
    );
  }

}
