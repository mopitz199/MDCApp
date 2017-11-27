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
  Picker,
  TouchableOpacity,
  Platform
} from 'react-native';

import {DeviceEventEmitter} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import SelectIOS from './ios-select';

// Import the custom theme
import * as theme from '../styles/theme';

import SelectAndroid from './android-select';

export default class FilterSort extends Component {

  constructor(props){
    super(props);
    this.state = {
      platform: Platform.OS,
      sortBy: '-date',
      filtersApplied: null
    }
  }

  componentWillMount(){
    this.applyFiltersListener = DeviceEventEmitter.addListener('applyFilters', (e)=>{
      this.setState({
        filtersApplied: e
      })
    })
  }

  _onFilterPress = () => {
    this.props.navigate('filter', {
      filtersApplied: this.state.filtersApplied,
      eventEmmit: this.props.eventEmmit
    });
  }

  _renderFilter(){
    return (
      <TouchableOpacity
        onPress={this._onFilterPress}
        style={styles.filterButtonContainer}
      >
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>
            Filter
          </Text>
          <Icon
            name="filter"
            size={16}
            color={theme.secondaryTextColor}
          />
        </View>
      </TouchableOpacity>
    )
  }

  _renderSelect(){
    if(Platform.OS==="ios"){
      return this._renderIOSSelect()
    }else{
      return this._renderAndroidSelect()
    }
  }


  _auxOnSortIOSByChange = (value, label) =>{
    this.setState({sortBy: value})
    this.props._onSortIOSByChange(value, label, this.state.filtersApplied)
  }

  _auxOnSortAndroidByChange = (itemValue, itemIndex, filtersApplied) => {
    this.setState({sortBy: itemValue})
    this.props._onSortAndroidByChange(itemValue, itemIndex, filtersApplied)
  }


  _renderIOSSelect = () => {
    const data = [
      {key: '-date', label: 'Date (descendant)'},
      {key: 'date', label: 'Date (ascendent)'},
      {key: '-profit', label: 'Profit (descendant)'},
      {key: 'profit', label: 'Profit (ascendent)'},
      {key: '-stop', label: 'Stop (descendant)'},
      {key: 'stop', label: 'Stop (ascendent)'},
    ]
    return (
      <SelectIOS
        onPress={this.props._onSortIOSByChange}
        firstIndex={0}
        color={'black'}
        style={styles.iosPicker}
        textSize={14}
        iconSize={25}
        data={data}
        iconType={'md-arrow-dropdown'}
      />
    )
  }

  _renderAndroidSelect = () => {
    let data = {
      'Date (descendant)': '-date',
      'Date (ascendent)': 'date',
      'Profit (descendant)': '-profit',
      'Profit (ascendent)': 'profit',
      'Stop (descendant)': '-stop',
      'Stop (ascendent)': 'stop',
    }
    return(
      <SelectAndroid
        data={data}
        style={styles.androidPicker}
        value={this.state.sortBy}
        color={'white'}
        height={35}
        iconPosition={5}
        backgroundColor={theme.primaryLightColor}
        onChange={(itemValue, itemIndex) => {this._auxOnSortAndroidByChange(itemValue, itemIndex, this.state.filtersApplied)} }
      >
      </SelectAndroid>
    )
  }




  render(){
    return (
      <View style={styles.toolBarContainer}>
        {this._renderSelect()}
        {this._renderFilter()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  toolBarContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: theme.borderColor,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    padding: 5
  },
  iosPicker:{
    flex: 1,
  },
  androidPicker:{
    flex: 1.3,
    borderColor: theme.primaryLightColor,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 5,
  },
  filterButtonContainer:{
    flex: 1,
    alignItems: 'center',
    height: 39,
    justifyContent: 'center',
    backgroundColor: theme.primaryLightColor,
    borderColor: theme.primaryLightColor,
    borderWidth: 2,
    borderRadius: 5,
  },
  filterContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText:{
    color: 'white',
    fontSize: 17,
    marginRight: 10,
  }
})
