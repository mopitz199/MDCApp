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
  TouchableHighlight
} from 'react-native';

// Style
import { styles } from '../styles/splash'

import { BackHandler } from 'react-native';

// Npm packages
import { NavigationActions } from 'react-navigation';
import { StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Get the default theme
import getTheme from '../../native-base-theme/components';

// Import the custom theme
import * as theme from '../styles/theme';


const resetActionMyTrades = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'myTrades'})]
});

const resetActionLogin = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'login'})]
});


class Null extends Component {
  render(){
    return null
  }
}


export default class Splash extends Component {

  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {
      visible: true
    }
  }

  static navigationOptions = {
    header: null,
    drawerLabel: <Null/>
  };


  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      if(global.currentIndex>0)return false;
      else return true;
    }.bind(this));
  }

  componentDidMount(){
    global.storage.load({
      key: 'token',
    }).then(ret => {
      this.props.navigation.dispatch(resetActionMyTrades);
    }).catch(err => {
      this.props.navigation.dispatch(resetActionLogin);
    });
  }

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
