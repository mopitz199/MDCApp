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
  Image,
  TouchableOpacity,
} from 'react-native';

// Style
import { styles } from '../styles/user-item-list';

// Npm packages
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Import the custom theme
import * as theme from '../styles/theme';

export default class UserItemList extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: this.props.data[0],
      navigate: this.props.data[1]
    };
  }

  _onPressButton = () => {
    this.state.navigate('otherTrades', {
      id: this.state.data.id,
      username: this.state.data.username
    });
  }


  render() {
    return (
      <View style={styles.userItemBorder}>
        <TouchableOpacity
          onPress={this._onPressButton}
        >
          <View style={styles.userItemList}>
            <FontAwesome
              name="user-circle"
              size={45}
              color={theme.primaryNormalColor}
            />
            <Text style={styles.itemTitle}>{this.state.data.username}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}
