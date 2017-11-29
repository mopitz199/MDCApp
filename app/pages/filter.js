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
  Platform
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
import SelectIOS from '../components/ios-select';

export default class Filter extends Component {

  constructor(props){
    super(props);
    const { params } = this.props.navigation.state;
    let filtersApplied = params.filtersApplied
    this.state = {
      result: filtersApplied!=null?filtersApplied['result']:'all',
      tradeType: filtersApplied!=null?filtersApplied['tradeType']:'all'
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white',
    title: 'Filter'
  });

  _renderIOSSelect = (data, variable) => {
    return (
      <SelectIOS
        onPress={(itemValue, itemIndex) => {this.setState({[variable]:itemValue}) }}
        defaultValue={this.state[variable]}
        color={'white'}
        style={styles.iosPicker}
        textSize={17}
        iconSize={25}
        data={data}
        iconType={'md-arrow-dropdown'}
      />
    )
  }

  _renderAndroidSelect = (data, variable) => {
    return (
      <SelectAndroid
        data={data}
        value={this.state[variable]}
        color={'white'}
        height={50}
        iconPosition={13}
        backgroundColor={theme.primaryLightColor}
        onChange={(itemValue, itemIndex) => {this.setState({[variable]:itemValue})} }
      >
      </SelectAndroid>
    )
  }


  _renderSelect = (variable) => {
    if(Platform.OS=='ios'){
      return this._renderIOSSelect(this._getData(variable), variable)
    }else{
      return this._renderAndroidSelect(this._getData(variable), variable)
    }
  }


  _getData(variable){
    if(variable=='result'){
      return {
        'All': 'all',
        'Win': 'w',
        'Lose': 'l'
      }
    }else if(variable=='tradeType'){
      return {
        'All': 'all', 'A1': 'a1', 'A2': 'a2', 'A3': 'a3',
        '20': '20', '80': '80', 'CBOT': 'cbot', 'XOVER': 'xover',
        'Other': 'other'
      }
    }else{
      return {}
    }
  }


  _renderItem(text, variable){
    return(
      <View style={styles.itemPickerContainer}>
        <Text style={styles.pickerText}>{text}</Text>
        {this._renderSelect(variable)}
      </View>
    )
  }

  _onFilterButton = () => {
    const {goBack} = this.props.navigation;
    const { params } = this.props.navigation.state;
    goBack();
    DeviceEventEmitter.emit(params.eventEmmit,  {
      result: this.state.result,
      tradeType: this.state.tradeType
    })
    DeviceEventEmitter.emit('applyFilters',  {
      result: this.state.result,
      tradeType: this.state.tradeType
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
          {this._renderItem('Result', 'result')}
          {this._renderItem('Type', 'tradeType')}
          {this._renderFilterButton()}
        </View>
      </StyleProvider>
    )
  }

}
