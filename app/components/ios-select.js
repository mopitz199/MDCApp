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
  TouchableWithoutFeedback
} from 'react-native';

//import { StyleSheet, Platform } from 'react-native';
//import * as theme from './theme';
//const platform = Platform.OS;

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import SimplePicker from 'react-native-simple-picker';

// Import the custom theme
import * as theme from '../styles/theme';

//import { styles } from '../styles/ios-select';

export default class SelectIOS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      label: null
    }
  }

  componentDidMount(){
    this.setState({
      label: this._getLabel(this.props.defaultValue)
    })
  }

  _onSortIOSByChange = (option) => {
    for(let label in this.props.data){
      if(this.props.data[label]==option){
        this.setState({label:label})
        this.props.onPress(option, label);
        break;
      }
    }
  }

  _getIndex = (value) => {
    let i = 0;
    for(let label in this.props.data){
      if(this.props.data[label]==value)return i
      i++;
    }
    return 0
  }

  _getLabels = () => {
    let res = []
    for(let label in this.props.data){
      res.push(label)
    }
    return res
  }

  _getLabel = (value) => {
    let i = 0;
    for (let label in this.props.data) {
      if (this.props.data.hasOwnProperty(label)) {
        if(value==this.props.data[label])return label
        i++
      }
    }
  }

  _getKeys = () => {
    let res = []
    for(let label in this.props.data){
      res.push(this.props.data[label])
    }
    return res
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {this.refs.picker.show()}}
      >
        <View style={[styles.selectContainer, this.props.style]}>
          <Text style={[
            {
              color: this.props.color,
              fontSize: this.props.textSize
            } ,styles.selectText
          ]}>
            {this.state.label}
          </Text>
          <Ionicon
            name={this.props.iconType}
            size={this.props.iconSize}
            color={this.props.color}
          />
          <SimplePicker
            ref={'picker'}
            initialOptionIndex={this._getIndex(this.props.defaultValue)}
            options={this._getKeys()}
            labels={this._getLabels()}
            onSubmit={(option) => {this._onSortIOSByChange(option)}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  selectContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  selectText:{
    marginRight: 10,
  },
});
