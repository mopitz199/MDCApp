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
  Image,
  TouchableHighlight
} from 'react-native';

// Style
import { styles } from '../styles/splash'

// Npm packages
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, StyleProvider, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Get the default theme
import getTheme from '../../native-base-theme/components';

// Import utils
import * as utils from '../utils/utils';

// Import the custom theme
import * as theme from '../styles/theme';

import CreateTrade from './create-trade';
import Login from './login';


const resetActionCreateTrade = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'createTrade'})]
});

const resetActionLogin = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'login'})]
});

export default class Splash extends Component {


  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {
      visible: true
    }
  }

  componentDidMount(){
    global.storage.load({
      key: 'token',
    }).then(ret => {
      this.props.navigation.dispatch(resetActionCreateTrade);
    }).catch(err => {
      this.props.navigation.dispatch(resetActionLogin);
    });
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <StyleProvider style={getTheme()}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../images/logo.png')}
        />
        <Text style={styles.title}>MDC Capital Group</Text>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </StyleProvider>
    )
  }

}
