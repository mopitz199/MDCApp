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
  TouchableOpacity,
  Platform
} from 'react-native';

import { Container, Header, Button, Content, ActionSheet } from "native-base";

import { NavigationActions } from 'react-navigation';

// Npm packages
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the custom theme
import * as theme from '../styles/theme';

import styles from '../styles/home-right-header.js';

const resetActionLogin = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'login'})]
});

var BUTTONS = ["Logout",];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class HomeRightHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      platform: Platform.OS
    };
  }

  _onLogout = () => {
    this.props.navigation.dispatch(resetActionLogin);
  }

  _showActions = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "Opciones"
      },
      buttonIndex => {
        if(BUTTONS[buttonIndex]=='Logout'){
          this._onLogout()
        }
        //this.setState({ clicked: BUTTONS[buttonIndex] });
      }
    )
  }

  _openCreateTradePage = () => {
    this.props.navigation.navigate('createTrade')
  }

  _createTradeButton(){
    return (
      <TouchableOpacity onPress={this._openCreateTradePage}>
        <Icon
          style={styles.plusIcon}
          name="plus"
          size={30}
          color={theme.secondaryTextColor}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={this._showActions}>
          <Icon
            style={styles.settingIcon}
            name="cogs"
            size={30}
            color={theme.secondaryTextColor}
          />
        </TouchableOpacity>
        {this.state.platform=='ios'?this._createTradeButton():null}
      </View>
    );
  }

}
