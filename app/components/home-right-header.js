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

// Npm packages
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the custom theme
import * as theme from '../styles/theme';

import styles from '../styles/home-right-header.js';

export default class HomeRightHeader extends Component {

  render() {
    return (
      <View style={styles.rightContainer}>
        <TouchableHighlight onPress={() => this.props.navigate('login') }>
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
