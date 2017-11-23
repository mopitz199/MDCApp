/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Picker,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Style
import { styles } from '../styles/filter'

import { Form, Item, Input, Label, StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Get the default theme
import getTheme from '../../native-base-theme/components';

import Dimensions from 'Dimensions';

// Import utils
import * as utils from '../utils/utils';

// Import http service
import * as http from '../utils/http';

// Import the custom theme
import * as theme from '../styles/theme';

// Validations
import {validate} from '../utils/validation';

export default class Filter extends Component {

  render() {
    return (
      <View>
        <Text>Hola</Text>
      </View>
    )
  }

}
