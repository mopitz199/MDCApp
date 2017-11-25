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
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

// Import the custom theme
import * as theme from '../styles/theme';

//import { styles } from '../styles/ios-select';

export default class SelectAndroid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    }
  }



  _getItems = () => {
    let data = this.props.data
    let resp = []
    for (var key in data) {
      var val = data[key];
      resp.push(
        <Picker.Item key={key} label={key} value={val} />
      )
    }
    return resp
  }

  onChange = (itemValue, itemIndex) =>{
    this.setState({value:itemValue})
    this.props.onChange(itemValue, itemIndex)
  }

  render() {
    return (
      <View style={styles.pickerContainer}>
        <Ionicon
          style={styles.pickerIcon}
          name={'md-arrow-dropdown'}
          size={24}
          color={this.props.color}
        />
        <Picker
          style={{color: this.props.color, backgroundColor: this.props.backgroundColor}}
          selectedValue={this.state.value}
          onValueChange={(itemValue, itemIndex) => {this.onChange(itemValue, itemIndex)}}>
          {this._getItems()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerContainer:{
  },
  pickerIcon:{
    position: 'absolute',
    right:20,
    bottom:10,
    zIndex: 2,
  }
});
