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
import Ionicon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

// Get the default theme
import getTheme from '../../native-base-theme/components';

import Dimensions from 'Dimensions';

import {DeviceEventEmitter} from 'react-native';

// Import utils
import * as utils from '../utils/utils';

// Import http service
import * as http from '../utils/http';

// Import the custom theme
import * as theme from '../styles/theme';

// Validations
import {validate} from '../utils/validation';

// Custom Components
import SelectAndroid from '../components/android-select';

export default class Filter extends Component {

  constructor(props){
    super(props);
    this.state = {
      result: 'all',
      type: 'all'
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white',
    title: 'Filter'
  });

  _renderAndroidResultSelect = () => {
    let data = {
      'All': 'all',
      'Win': 'w',
      'Lose': 'l'
    }
    return(
      <SelectAndroid
        data={data}
        label={'All'}
        color={'white'}
        backgroundColor={theme.primaryLightColor}
        onChange={(itemValue, itemIndex) => {this.setState({result:itemValue})} }
      >
      </SelectAndroid>
    )
  }

  _renderAndroidTypeSelect = () => {
    let data = {
      'All': 'all', 'A1': 'a1', 'A2': 'a2', 'A3': 'a3',
      '20': '20', '80': '80', 'CBOT': 'cbot', 'XOVER': 'xover',
      'Other': 'other'
    }
    return (
      <SelectAndroid
        data={data}
        label={'All'}
        color={'white'}
        backgroundColor={theme.primaryLightColor}
        onChange={(itemValue, itemIndex) => {this.setState({type:itemValue})} }
      >
      </SelectAndroid>
    )
  }

  _renderSelect(text, render){
    return(
      <View style={styles.itemPickerContainer}>
        <Text style={styles.pickerText}>{text}</Text>
        {render()}
      </View>
    )
  }

  _onFilterButton = () => {
    const {goBack} = this.props.navigation;
    goBack();
    DeviceEventEmitter.emit('applyFilters',  {
      result: this.state.result,
      type: this.state.type
    })
  }


  _renderFilterButton(){
    return (
      <TouchableOpacity
        onPress={this._onFilterButton}
        >
        <View style={styles.filterButton}>
          <Text style={styles.filterTextButton}>FILTER</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          {this._renderSelect('Result', this._renderAndroidResultSelect)}
          {this._renderSelect('Type', this._renderAndroidTypeSelect)}
          {this._renderFilterButton()}
        </View>
      </StyleProvider>
    )
  }

}
