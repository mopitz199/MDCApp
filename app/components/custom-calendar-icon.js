/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ScrollView,
  Button,
  TouchableNativeFeedback
} from 'react-native';

// Style
import styles from '../styles/custom-calendar-icon';

// Npm packages
import { StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

// Get the default theme
import getTheme from '../../native-base-theme/components';

// Import the custom theme
import * as theme from '../styles/theme';


export default class CustomCalendarIcon extends Component {

  render() {
    return (
      <Icon
        style={styles.datepickerIcon}
        name="calendar"
        size={25}
        color={'black'}
      />
    )
  }

}
