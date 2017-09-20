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
} from 'react-native';

import { NavigationActions } from 'react-navigation';

// Npm packages
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the custom theme
import * as theme from '../styles/theme';

import styles from '../styles/home-right-header.js';

const resetActionLogin = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'login'})]
});

export default class HomeRightHeader extends Component {

  _onLogout = () => {
    this.props.navigation.dispatch(resetActionLogin);
  }

  render() {
    return (
      <View style={styles.rightContainer}>
        <TouchableHighlight onPress={this._onLogout}>
          <Icon
            style={styles.logoutIcon}
            name="sign-out"
            size={30}
            color={theme.secondaryTextColor}
          />
        </TouchableHighlight>
      </View>
    );
  }

}
