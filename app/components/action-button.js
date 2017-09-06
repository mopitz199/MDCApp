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

import Icon from 'react-native-vector-icons/FontAwesome';

import ActionButton from 'react-native-action-button';

// Import the custom theme
import * as theme from '../styles/theme';

export default class CustomActionButton extends Component {

  render() {
    return (
      <ActionButton
        buttonColor={theme.secondaryNormalColor}
        buttonTextStyle={{color: theme.secondaryDarkColor}}
        onPress={() => this.props.navigate('createTrade') }
      />
    );
  }

}
